<template>
  <div
    class="promotion-card"
    role="button"
    tabindex="0"
    @click="$emit('click', promotion)"
    @keydown.enter="$emit('click', promotion)"
    :style="{ backgroundColor: promotion.bgColor || '#fff' }"
    :aria-label="promotion.title"
  >
    <div class="promo-inner">
      <div class="promo-content">
        <h3 class="promo-title">{{ promotion.title }}</h3>
        <p v-if="promotion.subtitle" class="promo-sub">{{ promotion.subtitle }}</p>
        <button
          class="promo-cta"
          :style="{ backgroundColor: promotion.buttonColor || '#1ba98e' }"
          @click.stop="$emit('click', promotion)"
        >
          {{ promotion.buttonText || 'Shop Now' }}
          <span class="arrow">→</span>
        </button>
      </div>
      <div class="promo-image" v-if="promotion.image" aria-hidden="true">
        <img :src="promotion.image" :alt="promotion.title" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ promotion: Object });
defineEmits(['click']);
</script>

<style scoped>
/* Card: larger radius, tighter padding */
.promotion-card {
  position: relative;
  border-radius: 24px;           /* more rounded like ref */
  padding: 28px 26px;            /* slightly tighter */
  min-height: 280px;             /* consistent height across cards */
  box-shadow: 0 8px 28px rgba(15, 52, 40, 0.08);
  transition: transform .18s ease, box-shadow .18s ease;
  overflow: visible; /* let big images extend outside the card edge */
}
.promotion-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(10, 30, 24, 0.12);
}

/* Layout: center vertically, balanced gap */
.promo-inner {
  display: flex;
  align-items: center;           /* center text and image vertically */
  justify-content: space-between;
  gap: 20px;
}

/* Content: narrower column for more room to the image */
.promo-content {
  flex: 1 1 50%;
  max-width: 500px;
}

.promo-title {
  margin: 0 0 14px;
  font-size: clamp(24px, 2.1vw, 30px);
  line-height: 1.16;
  font-weight: 800;
  color: #253d4e;
  letter-spacing: -0.2px;
}

.promo-sub {
  margin: 0 0 18px;
  color: rgba(37, 61, 78, 0.72);
  font-size: 14px;
}

/* Button: compact and clean */
.promo-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(12, 40, 30, 0.12);
  transition: transform .14s ease, box-shadow .14s ease;
}
.promo-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 34px rgba(12, 38, 30, 0.16); }
.promo-cta .arrow { font-size: 16px; }

/* Image: contained, slight right nudge */
.promo-image {
  position: relative;
  flex: 1 1 50%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.promo-image img {
  width: 480px;                  /* large but contained */
  max-width: 100%;
  height: auto;
  object-fit: contain;
  position: relative;
  right: -18px;                   /* subtle overflow like ref */
  bottom: 0;
  filter: drop-shadow(0 18px 36px rgba(10, 20, 14, 0.12));
  transition: transform .16s ease, filter .16s ease;
}

.promotion-card:hover .promo-image img {
  transform: translateY(-2px);
  filter: drop-shadow(0 22px 44px rgba(10, 20, 14, 0.14));
}

/* Responsive */
@media (max-width: 1200px) {
  .promotion-card { min-height: 260px; padding: 26px 22px; }
  .promo-image img { width: 400px; right: -6px; }
}
@media (max-width: 900px) {
  .promo-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
  .promo-content { max-width: 100%; }
  .promo-image { width: 100%; justify-content: center; min-height: auto; }
  .promo-image img { position: relative; right: 0; width: 300px; }
}
@media (max-width: 520px) {
  .promo-image img { width: 220px; }
  .promo-cta { width: 100%; justify-content: center; }
}
</style>
