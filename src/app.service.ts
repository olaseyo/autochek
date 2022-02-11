import { Injectable } from '@nestjs/common';
import axios from "axios";
import collect from 'collect.js';

@Injectable()
export class AppService {

  private baseUrl = "https://hacker-news.firebaseio.com/v0/";


  private async call(urls){
    const results: any = await axios.all(urls.map(url => axios.get(url)))
    return results.map(response => response.data);
  }


  private count(data, count?: number) {
    if (!count){
      count = 10
    }
    let listOfWords = [];
    data.forEach((story) => {
         let titleWords = story.title.split(" ")
         titleWords.forEach(word => {
           let cleanedWord = word.replace(/[^a-zA-Z ]/g, "").toLowerCase(); // remove all special characters and convert to lowercase
           if ([""].includes(cleanedWord)){
             return // skip
           }
           if (cleanedWord.length <= 2) {
             return //remove all 2 letter words like 'to' 'we' etc, 
           }
           listOfWords.push(cleanedWord)
         })
    })

    let collection = collect(listOfWords);
    const counted = collection.countBy();
    let lists = [];
    for (const [key, value] of Object.entries(counted.all())) {
      lists.push({word: key, occurrence:value})
    }
    collection = collect(lists);
    return collection.sortByDesc('occurrence').slice(0, count);
  }


  async getHome(): Promise<string> {
    return await 'Hello Autochek';
  }


  async getTopWordsInStoriesTitle(stories: number, count: number){
    
    try {
      let storyURLs = []
      const response = await axios.get(this.baseUrl + 'newstories.json');
      const storyIds = response.data.slice(0, stories);
      storyURLs = storyIds.map(id => this.baseUrl + `item/${id}.json`);

      let data = await this.call(storyURLs)
      return this.count(data, count);
       
    } catch(err) {
      console.log(err)
    }
  }

  async getTopWordsInStoriesTitleWeekly(week: number, count: number){
    let days = week * 7;
    let unixTimestamp =  Math.floor(new Date((new Date()).getTime() - (days * 24 * 60 * 60 * 1000)).getTime() / 1000) ;
    try {
       const response = await axios.get(this.baseUrl + 'newstories.json');
       const storyIds = response.data;
      //console.log(storyIds);
       const storyURLs = storyIds.map(id => this.baseUrl + `item/${id}.json`);
       let data = await this.call(storyURLs)
       const collection = collect(data);
       const filtered = collection.where('time', '>=', unixTimestamp); 
       return this.count(filtered.all(), count);
    } catch(err) {
      console.log(err)
    }
  }


  async getStoriesOfUsers(stories: number, karma: number){
    try {
       const response = await axios.get(this.baseUrl + 'newstories.json');
       const storyIds = response.data.slice(0, stories);
       const storyURLs = storyIds.map(id => this.baseUrl + `item/${id}.json`);

       const storiesData = await this.call(storyURLs);
       
       const users = storiesData.map(story => story.by);
       
       const userURLs = users.map(user => this.baseUrl + `user/${user}.json`);
       const userData = await this.call(userURLs);
       const filteredStories = storiesData.filter((story, index) => userData[index].karma > karma) // filter stories with user karma
       
       return this.count(filteredStories)

    } catch(err){
      console.log(err)
    }
  }
}
