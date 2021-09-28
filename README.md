# Database model challenge
_A solution as a Node JS API_

When I saw the description of this challenge, I thought I'd give it a go turning the solution into a Node JS REST API seen as Node JS is listed as part of the Willa stack. Hopefully that is ok.

I also took it as an opportunity to learn to wirte unit tests with Mocha and Chai (the whole coffee shop situation), which I had never done before, so please excuse the unpolishedness (totally a legit word).
The API is documented with Swagger, so it's easier to test it with different use cases (eg. different schemas that conform to the database.json structure).

In summary, here is the "tech stack" I used:
- Node JS (with JavaScript)
- Mocha with Chai 
- Swagger

To run the solution (Swagger documentation at [localhost:4000/api-docs/](https://breakdance.github.io/breakdance/) ):

```sh
npm start
```

To run the tests: 

```sh
npm test
```

## Endpoints

-  **/sortTablesFromFile** 
GET sorted tables from database.json file

- **/sortTables** 
POST request with json body -> returns sorted tables

## Things I could have done better
_(that I can think of off the top of my head)_

In the solution, I don't perform any validation of the JSON object of the schema. Needless to say, that would not be acceptable in a real world scenario, making the API unfit for production. 
I am also not confident I wrote the most efficient and exhaustive tests to say the least. I don't have a lot of experience writing unit tests and that is certainly something I need to work on.
Also, I set up Swagger manually as I had never used it in Node JS (only in .NET Core) so I feel like it looks a little rough.

👋 Thank you for your consideration! 
😃 I had a lot of fun 