<template>
 <div class="card-loader mb-4">
  <div>
   <div class="d-flex-mod mb-3">
    <div class="image-skl mt-0"></div>
    <div class="pl-2">
     <h4 class="badget-date2"></h4>
     <h4 class="badget-date mt-1"></h4>
    </div>
   </div>
  </div>
  <div class="d-flex-mod mb-4">
   <div class="image-skl mt-0"></div>
   <div class="pl-2">
    <h4 class="badget-date3"></h4>
    <h4 class="badget-sm mt-1"></h4>
   </div>
  </div>
  <div class="d-flex-mod mb-4">
   <div class="image-skl mt-0"></div>
   <div class="pl-2">
    <h4 class="badget-sm"></h4>
    <h4 class="badget-date mt-1"></h4>
   </div>
  </div>
 </div>
</template>

<script>
 export default {};
</script>

<style lang="scss">
 :root {
  --loading-grey: #ededed;
 }
 .card-loader {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.12); */
 }
 .card-loader .image-skl,
 .card-loader h4,
 .card-loader .description {
  background-color: var(--loading-grey);
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 60%
   )
   var(--loading-grey);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
 }
 .card-loader .image-skl {
  width: 50px;
  height: 50px;
  border-radius: 100%;
 }
 .card-loader h4 {
  min-height: 1.6rem;
  border-radius: 4px;
  animation-delay: 0.05s;
 }

 .card-loader .description {
  min-height: 4rem;
  border-radius: 4px;
  animation-delay: 0.06s;
 }
 .card-loader .badget-sm {
  width: 70px;
 }
 .card-loader .badget-date {
  width: 120px;
  min-height: 1rem;
 }
 .card-loader .badget-date2 {
  width: 150px;
  min-height: 3rem;
 }
 .card-loader .badget-date3 {
  width: 250px;
  min-height: 3rem;
 }
 .card-loader .badget-date--m {
  width: 250px;
  min-height: 1rem;
 }
 @keyframes loading {
  to {
   background-position-x: -20%;
  }
 }
</style>
