const fields = {
  User: [
    {
      id: 1,
      email: 'funmijoseph@hotmail.com',
      firstName: 'Funmi',
      lastName: 'Olaiya',
      password: '$2b$08$apEmEFk4ztdEr/CJ/IO6sesuYa.FzTxAfPE/HW7wYDWwu3Ib/CWNa',
      phoneNumber: '08065687887',
      isAdmin: 'false',
    },
    {
      id: 2,
      email: 'lydia001@hotmail.com',
      firstName: 'Tolu',
      lastName: 'Olaiya',
      password: '$2b$08$TtjBc7Z6xXgb2JN8e8oxS.xVkEOng3ZDVf7RCL.o3R6Ya3yztUsgO',
      phoneNumber: '080229849333',
      isAdmin: 'false',
    },
  ],
  Property: [
    {
      id: 1,
      owner: 'Funmi Olaiya',
      status: 'Available',
      price: 'N2,000,000',
      purpose: 'Buy',
      duration: 'Nil',
      type: 'Duplex',
      bedroom: '3',
      bathroom: '3',
      state: 'Oyo',
      city: 'Ibadan',
      address: 'No.5, Are Road',
      created_on: '2019-07-02T05:28:31.223Z',
      image_url: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    },
    {
      id: 2,
      owner: 'Seun Olaiya',
      status: 'Available',
      price: 'N1,000,000',
      purpose: 'Rent',
      duration: 'Monthly',
      type: 'Flat',
      bedroom: '2',
      bathroom: '3',
      state: 'Oyo',
      city: 'Ibadan',
      address: 'No.5, Bodija Road',
      createdOn: '2019-07-02T05:28:31.223Z',
      imageUrl: 'https://res.cloudinary.com/dlifhuus1/image/upload/v1562011203/propertypro-lite/house3_skq8ou.jpg',
    },
  ],
};


export default fields;