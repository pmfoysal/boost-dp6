const inputTag = document.querySelector(`input[type='text']`);
const copyTag = document.querySelector(`input[type='submit']`);
const msgTag = document.querySelector('p');

document.querySelector('button').addEventListener('click', function () {
   const color = generateColor();
   document.body.style.backgroundColor = color;
   inputTag.value = color;
});

copyTag.addEventListener('click', function () {
   const value = inputTag.value;
   const length = value.length === 4 || value.length === 7;

   if (value && length) {
      navigator.clipboard.writeText(inputTag.value.toUpperCase());
      generateMsg(inputTag.value, true);
   } else {
      generateMsg(inputTag.value, false);
   }
});

inputTag.addEventListener('input', function (e) {
   const text = e.target.value;
   const hash = text.slice(0, 1);
   const rest = text.slice(1, text.length);

   if (isHashed(hash)) {
      inputTag.value = hash;
      if (isValidHEX(rest)) {
         inputTag.value = hash + rest;
      } else {
         inputTag.value = hash + rest.slice(0, rest.length - 1);
      }
      if (text.length === 4 || text.length === 7) {
         document.body.style.backgroundColor = text;
      }
   } else {
      inputTag.value = '';
   }
});

function generateMsg(color, success) {
   if (success) {
      msgTag.innerHTML = `${color.toUpperCase()} Copied!`;
      msgTag.style.backgroundColor = 'rgb(171, 242, 251)';
      msgTag.style.color = 'black';
   } else {
      msgTag.innerHTML = `Invalid Color!`;
      msgTag.style.backgroundColor = 'red';
      msgTag.style.color = 'white';
   }
   msgTag.classList.add('active');

   setTimeout(function () {
      msgTag.classList.remove('active');
   }, 900);
}

function generateColor() {
   let r = Math.floor(Math.random() * 255).toString(16);
   let g = Math.floor(Math.random() * 255).toString(16);
   let b = Math.floor(Math.random() * 255).toString(16);

   r = r.length < 2 ? `0${r}` : r;
   g = g.length < 2 ? `0${g}` : g;
   b = b.length < 2 ? `0${b}` : b;
   return `#${r}${g}${b}`;
}

function isHashed(hash) {
   return hash === '#' ? true : false;
}

function isValidHEX(color) {
   return /^[0-9A-Fa-f]+$/.test(color);
}
