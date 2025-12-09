<template>
  <section class="hero">
    <div class="hero-text">
      <h1>Don't miss amazing<br/>grocery deals</h1>
      <p>Sign up for the daily newsletter</p>
      <div class="newsletter">
        <span class="icon">✉️</span>
        <input type="email" placeholder="Your email address" />
        <button class="subscribe-btn">Subscribe</button>
      </div>
    </div>
    <div class="hero-image">
      <img :src="bannerImage" alt="Fresh groceries" />
    </div>
  </section>
</template>

<script setup>
import bannerImage from '../images/fresh-apples-banner.png';
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #fff9e5 0%, #fefbe8 50%, #fff3e0 100%);
  padding: 60px 80px;
  border-radius: 20px;
  margin: 30px auto;
  max-width: 1400px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.hero-text {
  flex: 1;
  max-width: 50%;
  z-index: 2;
}

.hero-text h1 {
  font-size: 56px;
  font-weight: 700;
  color: #253d4e;
  margin-bottom: 15px;
  line-height: 1.2;
}

.hero-text p {
  font-size: 20px;
  color: #7e7e7e;
  margin-bottom: 35px;
}

.newsletter {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  padding: 5px;
}

.newsletter .icon {
  padding: 0 20px;
  font-size: 20px;
}

.newsletter input {
  flex: 1;
  padding: 18px 10px;
  border: none;
  outline: none;
  font-size: 15px;
  color: #253d4e;
}

.newsletter input::placeholder {
  color: #adadad;
}

.subscribe-btn {
  background: #3bb77e;
  color: #fff;
  padding: 18px 40px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  transition: background 0.2s ease;
  white-space: nowrap;
  border-radius: 50px;
}

.subscribe-btn:hover {
  background: #2f9c65;
  box-shadow: 0 5px 15px rgba(59, 183, 126, 0.3);
}

.hero-image {
  flex-shrink: 0;
  position: relative;
}

.hero-image img {
  width: 550px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.1));
}

@media (max-width: 1200px) {
  .hero {
    padding: 50px 40px;
  }

  .hero-text h1 {
    font-size: 42px;
  }

  .hero-image img {
    width: 450px;
  }
}

@media (max-width: 992px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 40px 30px;
  }

  .hero-text {
    max-width: 100%;
    margin-bottom: 30px;
  }

  .hero-text h1 {
    font-size: 36px;
  }

  .newsletter {
    margin: 0 auto;
  }

  .hero-image img {
    width: 100%;
    max-width: 400px;
  }
}
</style>
