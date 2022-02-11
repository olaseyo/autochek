## Installation

* clone repo
* `cd` into repo directory`
*  Run `npm install`

### Run app
* Run `npm run start:dev`

### Endpoints
* `/top_words_title/<number_of_stories>/<count>/`: Note that `number_of_stories` and `count` parameters are optional. When not provided the system defaults to `25` and `10` respectively.


* `/top_words_title_week/<weeks>/<count>/`: Note that `weeks` and `count` parameters are optional. When not provided, `weeks` defaults to `1` for the last week and `count` to `10`. A value of `2` for `weeks` will mean last 2 weeks.


* `/user_stories/<number_of_stories>/<karma>`: Also note that the `number_of_stories` and `karma` parameters are optional, they default to `600` and `10` respectively. The `HackerNews` API sometimes delays in returning `users`data. Hence, the reason for the delay when runing tests.
