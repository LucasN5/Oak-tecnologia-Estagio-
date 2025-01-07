document.addEventListener("DOMContentLoaded", () => {
  const formPage = window.location.pathname.includes("form.html");
  const listPage = window.location.pathname.includes("list.html");

  const loadProducts = () => JSON.parse(localStorage.getItem("products")) || [];

  const saveProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const addProductToTable = (product) => {
    const productTableBody = document.getElementById("productTableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="productListTitle">${product.name}</td>
      <td class="productListValue">${product.value}</td>
      <td class="productListDescription">${product.description}</td>
      <td class="productListDisponibility">${product.availability}</td>
      <td><button class="deleteButton">Excluir</button></td>
    `;

    row.querySelector(".deleteButton").addEventListener("click", () => {
      row.remove();
      const updatedProducts = loadProducts().filter(
        (p) => p.name !== product.name
      );
      saveProducts(updatedProducts);
    });

    productTableBody.appendChild(row);
  };

  if (formPage) {
    const productNameInput = document.getElementById("productName");
    const productValueInput = document.getElementById("productValue");
    const productDescriptionInput =
      document.getElementById("productDescription");
    const productDisponibilityYes = document.getElementById(
      "productDisponibilityYes"
    );
    const productDisponibilityNo = document.getElementById(
      "productDisponibilityNo"
    );
    const submitButton = document.getElementById("buttonFormSubmit");

    submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      const name = productNameInput.value.trim();
      const value = productValueInput.value.trim();
      const description = productDescriptionInput.value.trim();
      const availability = productDisponibilityYes.checked ? "Sim" : "Não";

      if (!name || !value || !description) {
        alert("Preencha todos os campos!");
        return;
      }

      const newProduct = { name, value, description, availability };

      const products = loadProducts();
      products.push(newProduct);
      saveProducts(products);

      alert("Produto cadastrado com sucesso!");

      productNameInput.value = "";
      productValueInput.value = "";
      productDescriptionInput.value = "";
      productDisponibilityYes.checked = false;
      productDisponibilityNo.checked = false;

      window.location.href = "./list.html";
    });
  }

  if (listPage) {
    const products = loadProducts();
    products.forEach((product) => addProductToTable(product));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const productValueInput = document.getElementById("productValue");

  productValueInput.addEventListener("input", (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    value = (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    e.target.value = value;
  });

  productValueInput.addEventListener("blur", (e) => {
    if (!e.target.value) {
      e.target.value = "R$ 0,00";
    }
  });
});
