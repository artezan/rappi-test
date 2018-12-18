export const DATA_CATEGORY = {
  categories: [
    {
      img: 'assets/coke.png',
      id: 1001,
      name: 'Bebidas',
      sublevels: [
        {
          img: 'assets/can.png',
          id: 1,
          name: 'Gaseosas',
          sublevels: [
            {
              img: 'assets/juice.png',
              id: 2,
              name: 'Con azúcar'
            },
            {
              img: 'assets/juice.png',
              id: 3,
              name: 'Sin azúcar'
            }
          ]
        }
      ]
    },
    {
      img: 'assets/breakfast.png',
      id: 2001,
      name: 'Desayunos',
      sublevels: [
        {
          img: 'assets/grocery.png',
          id: 4,
          name: 'Fake 1',
          sublevels: [
            {
              img: 'assets/image.png',

              id: 5,
              name: 'Fake 2'
            },
            {
              img: 'assets/image.png',

              id: 6,
              name: 'Fake 3',
              sublevels: [
                {
                  img: 'assets/image.png',

                  id: 7,
                  name: 'Fake 4'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      img: 'assets/chicken.png',
      id: 8003,
      name: 'Almuerzos',
      sublevels: [
        {
          img: 'assets/grocery.png',
          id: 9,
          name: 'Fake 5'
        },
        {
          img: 'assets/restaurant.png',
          id: 10,
          name: 'Fake 6'
        }
      ]
    },
    {
      img: 'assets/wine.png',
      id: 11004,
      name: 'Vinos',
      sublevels: [
        {
          img: 'assets/wine1.png',
          id: 12,
          name: 'Fake 8'
        },
        {
          img: 'assets/wine.png',
          id: 13,
          name: 'Fake 9'
        }
      ]
    }
  ]
};
