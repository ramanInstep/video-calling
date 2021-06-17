export function getAllProducts(args) {
  console.log(args,'arg88888')
    let subcategory = '';
    if (args && args.subcategory && args.subcategory.length > 0) {
      subcategory = args.subcategory.map((e) => e).join(',');
    }
    return `
    query{
      products(categories:"${subcategory}" ){
        _id
        code
        title
        SKU
        price
        type
        description
        shortDescription
        overview
        heroImage
      }
    }`;
  }
  
  export function getAllUpSales() {
    return `
    query{
      upsales{
        _id
        code
        title
        heroImage
        description
      }
    }`;
  }
  