document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const titleEl = document.getElementById('title');
  const priceEl = document.getElementById('price');
  const imageEl = document.getElementById('image');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');

  const titleError = document.getElementById('titleError');
  const priceError = document.getElementById('priceError');
  const imageError = document.getElementById('imageError');

  function validate() {
    let isValid = true;

    
    if (titleEl.value.trim().length < 3) {
      titleError.textContent = 'Минимум 3 символа';
      isValid = false;
    } else {
      titleError.textContent = '';
    }

    
    const price = parseFloat(priceEl.value);
    if (isNaN(price) || price <= 0) {
      priceError.textContent = 'Введите сумму';
      isValid = false;
    } else {
      priceError.textContent = '';
    }

    
    try {
      new URL(imageEl.value);
      imageError.textContent = '';
    } catch {
      imageError.textContent = 'URL изображения';
      isValid = false;
    }

    return isValid;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) return;

    submitBtn.disabled = true;

    const data = {
      title: titleEl.value.trim(),
      price: parseFloat(priceEl.value),
      image: imageEl.value.trim()
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Ошибка сети');

      showToast('Добавлено');
      form.reset(); 
    } catch (err) {
      showToast('Ошибка при добавлении');
      console.error(err);
    } finally {
      submitBtn.disabled = false;
    }
  });
});



