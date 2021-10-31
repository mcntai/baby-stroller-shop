'use strict'
const getCategories = require('../../app/bll/category/get-categories')
const { Category } = require('../../app/models/index')

describe('bll/getCategories', () => {
  let categories
  let response

  before(async () => {
    await Category.deleteMany()

    const categoriesData = [
      {
        title        : 'Детские товары и игрушки',
        subcategories: [
          {
            title: 'Прогулки и детская комната',
          },
          {
            title: 'Кормление и гигиена',
          },
        ],
      },
      {
        title        : 'Компьютерная техника',
        subcategories: [
          {
            title: 'Ноутбуки и аксессуары',
          },
          {
            title: 'Мониторы',
          },
        ],
      },
    ]

    categories = await Category.insertMany(categoriesData)

    response = await getCategories()
  })

  it('should return categories', () => {
    assert(response)
  })

  it('category should have expected shape', () => {
    const category = response.categories[0]

    const mappedCategory = {
      categories: {
        id           : category.id,
        title        : category.title,
        subcategories: [
          {
            id   : category.subcategories[0].id,
            title: category.subcategories[0].title,
          },
          {
            id   : category.subcategories[1].id,
            title: category.subcategories[1].title,
          },
        ],
      },
    }

    const c = categories.find(c => c.id === mappedCategory.categories.id)

    assert(c)

    assert.deepEqual(mappedCategory, {
      categories: {
        id           : c.id,
        title        : c.title,
        subcategories: [
          {
            id   : c.subcategories[0].id,
            title: c.subcategories[0].title,
          },
          {
            id   : c.subcategories[1].id,
            title: c.subcategories[1].title,
          },
        ],
      },
    })
  })
})
