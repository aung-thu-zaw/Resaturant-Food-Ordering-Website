<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { onMounted } from 'vue'
import { useTitle } from '@vueuse/core'

useTitle('About - Restaurant Food Ordering')

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <section class="background" data-aos="zoom-out" data-aos-duration="1000">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">About Us</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">About</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto">
        <p class="font-medium text-sm text-purpleDark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita corrupti qui consectetur
          magni. Explicabo nostrum voluptates quia temporibus accusamus ea quibusdam facilis fugit
          ad voluptatibus? Aut nemo vero ducimus dolorem rerum enim qui, error iure aperiam dicta
          repellat maxime at facere doloribus laudantium, minus et consectetur? Molestias quis,
          omnis hic facere ipsam animi. Pariatur exercitationem est corrupti natus minus numquam
          impedit nam excepturi tempora delectus dolores cupiditate architecto, sed consectetur in
          laudantium, nemo blanditiis mollitia unde commodi doloremque vitae cumque! Sequi, tenetur
          perspiciatis! Nobis iusto veritatis quasi dicta quis repudiandae voluptatibus neque,
          adipisci est ratione accusamus fugit natus totam officia aliquam? Odit quaerat libero
          saepe dolore nesciunt praesentium maiores vero architecto rem cupiditate facere modi sed
          reiciendis dolorum, eius ipsam nostrum! Aut facere, optio earum dicta corporis ad itaque
          iusto, rem, quam assumenda eos! Culpa sed architecto obcaecati magnam harum ipsa
          reiciendis, ullam totam vero rem dignissimos exercitationem veritatis nisi expedita ad
          quas! Voluptatum cumque assumenda a fugit reiciendis similique incidunt odio totam facilis
          itaque velit perspiciatis quasi delectus nihil voluptatem id ex, modi ducimus sapiente
          aliquam laborum officia quidem ipsam recusandae? Corporis exercitationem aliquam deleniti
          facilis error aliquid saepe provident nisi quisquam! Ipsa pariatur odio aliquam unde quo,
          magni laudantium, quasi ab nisi consequuntur aperiam quibusdam! Adipisci mollitia in omnis
          corrupti laboriosam ut id tenetur quaerat suscipit. Iure officia iste repellendus
          voluptatibus ipsam possimus animi deserunt aut ullam quaerat vero blanditiis est
          architecto sed qui dicta quam, doloremque earum incidunt et quibusdam? Vero nostrum
          praesentium ratione dolorem adipisci saepe illo officia quisquam iusto qui perferendis
          placeat suscipit accusantium earum provident dolor nisi blanditiis ex quia voluptate a,
          soluta hic tempore nesciunt! Atque voluptatem fuga unde perferendis nesciunt cupiditate
          aliquam numquam veniam quidem vel adipisci error explicabo, porro, rem illum repellendus
          impedit ratione labore fugiat natus dignissimos a, quod veritatis quo? Fugiat officiis
          reprehenderit quisquam, odio dicta quae dignissimos. Molestias eaque a quasi, ut eum
          dolore omnis illo vero quod ullam, similique ab. Dolor ex beatae voluptatem hic eaque
          corporis iusto! Tempora commodi rem facere, recusandae, asperiores quibusdam fugit
          voluptatem, corporis dolore ex ad praesentium nam assumenda. Aliquid quidem sint quasi
          quos magni. Laudantium vitae voluptatem officia error mollitia repudiandae aspernatur,
          voluptas corporis eius praesentium, fugit eaque exercitationem debitis inventore alias,
          adipisci voluptatum? Commodi a eos accusantium, facilis quam blanditiis. Excepturi, sint
          impedit fugit adipisci ipsum atque cum illo rem earum quis aut iure voluptate libero optio
          officiis saepe ut, autem facere praesentium, sapiente minus amet blanditiis tenetur. Illo
          sunt necessitatibus sint debitis tempore iste nisi earum animi autem accusantium ipsum
          officiis, corrupti vel porro eaque! Est veritatis dicta quis, neque, accusantium
          aspernatur quibusdam nesciunt suscipit, doloremque tempore similique. Obcaecati ratione
          sed totam dolore praesentium a? Ab, vero deleniti expedita magnam magni unde doloribus
          maiores explicabo nulla minus, praesentium tenetur iure itaque accusamus eveniet adipisci
          veritatis quo provident quos sapiente reiciendis culpa, sunt illo rerum? Blanditiis
          asperiores possimus ullam atque ab officia alias, velit laboriosam recusandae totam et,
          sit error, corrupti sequi repellat molestias vero eligendi expedita! Qui, unde voluptas.
        </p>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../assets/images/about-cover.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
