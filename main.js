const typesList = document.getElementById("typesList");
const productsList = document.getElementById("productsList");
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

var types = document.querySelectorAll(".btnType");

types.forEach((element) => {
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
        `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${element.id}`
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
      types.forEach((type) => {
        type.classList.remove("btnTypeActive");
      });
      element.classList.add("btnTypeActive");
    }
  };
});

const vegeOnly = document.getElementById("vegeOnly");
const meats = ["MEAT", "FISH", "COOKED_MEATS"];

vegeOnly.addEventListener("change", (event) => {
  productsList.innerHTML = "";
  if (vegeOnly.checked) {
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
        if (
          product.type === "MEAT" ||
          product.type === "FISH" ||
          product.type === "COOKED_MEATS"
        ) {
        } else {
          let element = document.createElement("div");
          element.classList.add("blockCategories");
          element.innerHTML = `<div class="${product.type}" id="${product.id}">
          <img src="${product.iconUrl}" alt="${product.name}">
          <p class="desc">${product.name}</p>`;
          productsList.appendChild(element);
        }
      });
    });
  } else {
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
  }
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
