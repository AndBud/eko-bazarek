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
    element.onclick = function () {
      if (element.classList.contains("btnTypeActive")) {
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
        element.classList.remove("btnTypeActive");
      } else {
        productsList.innerHTML = "";
        if (vegeOnly.checked) {
          getProducts(
            `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${type.id}`
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
            `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${type.id}`
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
        typesList.childNodes.forEach((type) => {
          type.classList.remove("btnTypeActive");
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

const vegeOnly = document.getElementById("vege");
const meats = ["MEAT", "FISH", "COOKED_MEATS"];

vegeOnly.addEventListener("change", (event) => {
  productsList.innerHTML = "";
  typesList.childNodes.forEach((type) => {
    type.classList.remove("btnTypeActive");
  });
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
  try {
    const response = await fetch(
      "https://api-eko-bazarek.azurewebsites.net/api/products/types"
    );
    if (response.status === 404) {
      throw new Error("Page not found");
    } else if (response.status === 500) {
      throw new Error("Server error");
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getProducts(url) {
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      throw new Error("Page not found");
    } else if (response.status === 500) {
      throw new Error("Server error");
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
