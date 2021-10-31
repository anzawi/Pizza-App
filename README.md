# to make code working in ypu host :

* open your terminal or cmd
* navigate to project directory
* in [client] directory and run `npm install`

* then navigate to [server] directory and run `composer install`
* set you database information in [.env] file & take a look to last 2 rows!
* after composer finish run `php artisan migrate`

* go to `../client/app/api/agent.ts` and change api url

* now serve [server] and [client] :)

### to generate some fake products :
 * run `php artisan seed`

## please note : 

### client build with react
### back-end build with php (Laravel)

to see demo please visit : [demo this app](http://anzawi-001-site1.itempurl.com)
