var typesList = document.getElementById("typesList");
var productsList = document.getElementById("productsList");
// fetching site elements
getTypes().then((types) => {
  types.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  types.forEach((type) => {
    let element = document.createElement("a");
    element.classList.add("btnType");
    element.setAttribute("id", type.id);
    element.textContent = type.name;
    typesList.appendChild(element);

    element.onclick = function () {
      if (element.classList.contains("btnTypeActive")) {
        productsList.innerHTML = "";
        getProducts(
          "https://api-eko-bazarek.azurewebsites.net/api/products/categories"
        ).then((products) => {
          products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          products.forEach((product) => {
            let element = document.createElement("div");
            element.classList.add("blockCategories");
            element.innerHTML = `<div class="${product.type}" id="${product.id}">
          <img src="${product.iconUrl}" alt="${product.name}">
          <p class="desc">${product.name}</p>`;
            productsList.appendChild(element);
          });
        });
        element.classList.remove("btnTypeActive");
      } else {
        getProducts(
          `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${type.id}`
        ).then((products) => {
          productsList.innerHTML = "";
          products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          products.forEach((product) => {
            let element = document.createElement("div");
            element.classList.add("blockCategories");
            element.innerHTML = `<div class="${product.type}" id="${product.id}">
              <img src="${product.iconUrl}" alt="${product.name}">
              <p class="desc">${product.name}</p>`;
            productsList.appendChild(element);
          });
        });
        element.classList.add("btnTypeActive");
      }
    };
  });
});

getProducts(
  "https://api-eko-bazarek.azurewebsites.net/api/products/categories"
).then((products) => {
  products.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  products.forEach((product) => {
    let element = document.createElement("div");
    element.classList.add("blockCategories");
    element.innerHTML = `<div class="${product.type}" id="${product.id}">
          <img src="${product.iconUrl}" alt="${product.name}">
          <p class="desc">${product.name}</p>`;
    productsList.appendChild(element);
  });
});

async function getTypes() {
  const response = await fetch(
    "https://api-eko-bazarek.azurewebsites.net/api/products/types"
  );
  return response.json();
}

async function getProducts(url) {
  const response = await fetch(url);
  return response.json();
}
