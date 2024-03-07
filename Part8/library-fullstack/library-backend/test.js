

const allBooks = [
        {
          "title": "Agile software development",
          "author": {
            "name": "Robert Martin",
            "id": "65d96f03410a3eca9c6712f0"
          },
          "id": "65d96fcd410a3eca9c671309",
          "genres": [
            "agile",
            "patterns",
            "design"
          ]
        },
        {
          "title": "Clean Code",
          "author": {
            "name": "Robert Martin",
            "id": "65d96f03410a3eca9c6712f0"
          },
          "id": "65d9701f410a3eca9c67131b",
          "genres": [
            "refactoring"
          ]
        },
        {
          "title": "Refactoring, edition 2",
          "author": {
            "name": "Martin Fowler",
            "id": "65dc036a4b04791c6ed015a6"
          },
          "id": "65dc0bf69bff487a0b8a8bcd",
          "genres": [
            "refactoring"
          ]
        },
        {
          "title": "Refactoring to patterns",
          "author": {
            "name": "Joshua Kerievsky",
            "id": "65dc03a04b04791c6ed015ca"
          },
          "id": "65dc0c7e9bff487a0b8a8be0",
          "genres": [
            "refactoring",
            "patterns"
          ]
        },
        {
          "title": "Practical Object-Oriented Design, An Agile Primer Using Ruby",
          "author": {
            "name": "Sandi Metz",
            "id": "65dc03b14b04791c6ed015d8"
          },
          "id": "65dc0d3f9bff487a0b8a8bf1",
          "genres": [
            "refactoring",
            "design"
          ]
        },
        {
          "title": "Crime and punishment",
          "author": {
            "name": "Fyodor Dostoevsky",
            "id": "65dc038c4b04791c6ed015b9"
          },
          "id": "65dc114d9bff487a0b8a8c03",
          "genres": [
            "classic",
            "crime"
          ]
        },
        {
          "title": "The Demon",
          "author": {
            "name": "Fyodor Dostoevsky",
            "id": "65dc038c4b04791c6ed015b9"
          },
          "id": "65dc11d89bff487a0b8a8c0f",
          "genres": [
            "classic",
            "revolution"
          ]
        },
        {
            "title": "The Demon",
            "author": {
              "name": "Fyodor Dostoevsky",
              "id": "65dc038c4b04791c6ed015b9"
            },
            "id": "65dc11d89bff487a0b8a8c0f",
            "genres": [
              "classic",
              "revolution"
            ]
          }
      ]

const result = allBooks.reduce((result,item) => {
    item.genres.forEach(element => {
        let condition = result.includes(element)
        if(!condition){
            result.push(element)
        }
    })
    return result
},[])


console.log('result :',result)      