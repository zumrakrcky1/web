document.addEventListener('DOMContentLoaded', function() {
  //! Puanlama butonlarını seç
  const stars = document.querySelectorAll('.rating span');
  const submitButton = document.querySelector('.submit-rating');
  const ratingResult = document.querySelector('.rating-result');
  let ratingValue = 0;

  //! Yıldızlara tıklanabilirlik ekleme
  stars.forEach(star => {
      star.addEventListener('click', function() {
          ratingValue = this.getAttribute('data-value');
          updateRating(ratingValue);
      });
  });

  //! Yıldızlar tıklanarak güncelleniyor
  function updateRating(value) {
      stars.forEach(star => {
          if (star.getAttribute('data-value') <= value) {
              star.classList.add('selected');
          } else {
              star.classList.remove('selected');
          }
      });
      ratingResult.textContent = `Puan: ${value}`;
  }

  //! Gönder butonuna tıklama işlevi
  submitButton.addEventListener('click', function() {
      if (ratingValue === 0) {
          alert("Lütfen bir puan seçin!");
          return;
      }

      //! Gönderim işlemi (Örneğin puanı bir veritabanına kaydetme)
      alert(`Puanınız ${ratingValue} olarak kaydedildi!`);

      //! Puan gönderildikten sonra butonu devre dışı bırak
      submitButton.setAttribute('disabled', 'true');
      submitButton.textContent = "Puan Gönderildi";
  });
});
//pop-up fonksiyonları
function showPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'flex';
}

function closePopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';
}
const allQuestions = [
  { question: "Çocuk acil servisinde hangi yaş aralığı çocuklar kabul edilir?", options: ["0-1 yaş", "0-5 yaş", "1-10 yaş", "1-18 yaş", "0-18 yaş"], answer: "0-18 yaş" },
  { question: "Çocuk yoğun bakım ünitesinde el yıkama sıklığı nedir?", options: ["Hasta ile her temastan sonra", "Sadece yemek yemeden önce", "Sadece iş bitiminde", "Sabah-akşam olmak üzere günde 2 kez", "Herhangi bir işlemden önce ve sonra"], answer: "Herhangi bir işlemden önce ve sonra" },
  { question: "Çocuk hematoloji ve onkolojisi bölümünde en sık kullanılan tedavi yöntemi?", options: ["Fizik tedavi", "Psikoterapi", "Ameliyat", "Radyoterapi", "Kemoterapi"], answer: "Kemoterapi" },
  { question: "Çocuk hastalarla iletişimde hangi yöntem en etkili?", options: ["Resmi dil kullanmak", "Sadece ebeveynlerle konuşmak", "Basit ve anlaşılabilir dil", "Sessiz kalmak ve sorularını dinlemek", "Tedavi detaylarını gizlemek"], answer: "Basit ve anlaşılabilir dil" },
  { question: "Çocuk servislerinde enfeksiyon kontrolü için zorunlu ekipman?", options: ["Önlük", "Maske", "Eldiven", "Steril malzeme", "Tüm yukarıdakiler"], answer: "Tüm yukarıdakiler" },
  { question: "Vücutta oksijen taşınmasından sorumlu molekül hangisidir?", options: ["Lökosit", "Trombosit", "Hemoglobin", "Albümin", "Glukoz"], answer: "Hemoglobin" },
  { question: "Bir hastada ani başlayan göğüs ağrısı ve nefes darlığı görülüyorsa, ilk olarak hangi durumdan şüphelenilmelidir?", options: ["Hipertansiyon", "Pulmoner Emboli", "Karaciğer Yetmezliği", "Hipoglisemi", "Anemi"], answer: "Pulmoner Emboli" },
  { question: "Hangi vitamin eksikliği gece körlüğüne yol açar?", options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin B12", "Vitamin E"], answer: "Vitamin A" },
  { question: "Bir çocuğun vücut sıcaklığı 38,5 °C ise hangi durum göz önünde bulundurulmalıdır?", options: ["Hipotermi", "Normal Sıcaklık", "Ateş (Febril Durum)", "Anemi", "Susuzluk"], answer: "Ateş (Febril Durum)" },
  { question: "Aşağıdakilerden hangisi vücutta sıvı dengesini sağlayan başlıca elektrolitlerden biridir?", options: ["Potasyum", "Kalsiyum", "Magnezyum", "Çinko", "Demir"], answer: "Potasyum" }
];

let currentUser = '';
let currentQuestions = [];
let correctAnswers = [];
let score = 0;

// Kullanıcı Giriş İşlemi
document.getElementById('startQuiz').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (username === '') {
      alert('Lütfen bir kullanıcı adı giriniz!');
      return;
  }

  currentUser = username;

  // Rastgele 5 soru seç
  currentQuestions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);

  // Quiz formunu oluştur
  const questionsContainer = document.getElementById('questionsContainer');
  questionsContainer.innerHTML = '';
  currentQuestions.forEach((q, index) => {
      questionsContainer.innerHTML += `
          <div class="mb-3">
              <p><strong>${index + 1}. ${q.question}</strong></p>
              ${q.options.map((option, i) => `
                  <div>
                      <input type="radio" id="q${index + 1}_o${i}" name="q${index}" value="${option}">
                      <label for="q${index + 1}_o${i}">${option}</label>
                  </div>
              `).join('')}
          </div>
      `;
  });

  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('quizForm').classList.remove('hidden');
});

// Quiz Sonuçları
document.getElementById('quizForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Kullanıcı cevaplarını kontrol et
  score = 0;
  currentQuestions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
          score += 20;
      }
  });

  // Sonuçları tabloya ekle
  const resultsTable = document.getElementById('resultsTable');
  resultsTable.innerHTML += `
      <tr>
          <td>${currentUser}</td>
          <td>${score}%</td>
      </tr>
  `;

  // Sonucu göster
  document.querySelector('.result').classList.remove('hidden');
  document.getElementById('score').textContent = score;

  // Quiz formunu gizle ve giriş ekranına dön
  document.getElementById('quizForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');

  // Giriş ekranındaki kullanıcı adı kutusunu temizle
  document.getElementById('username').value = '';

  // Sonuç ekranını gizle (bir süre sonra veya yeni kullanıcı giriş yapana kadar)
  setTimeout(() => {
      document.querySelector('.result').classList.add('hidden');
  }, 5000);
});
