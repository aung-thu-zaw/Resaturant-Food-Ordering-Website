<script setup>
// Your Code
</script>

<template>
  <div>
    <div class="border border-gray-300 bg-white rounded-md">
      <ul
        class="flex list-none flex-row px-10 border-b border-b-gray-300"
        role="tablist"
        data-te-nav-ref
      >
        <li role="presentation">
          <a
            href="#tabs-description"
            class="block border-x-0 border-b-2 border-t-0 border-transparent px-7 py-6 text-sm font-medium leading-tight text-slate-700 hover:isolate hover:border-transparent focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary"
            data-te-toggle="pill"
            data-te-target="#description"
            data-te-nav-active
            role="tab"
            aria-controls="tabs-home"
            aria-selected="true"
          >
            <i class="fa-solid fa-file-lines mr-2"></i>
            Description
          </a>
        </li>

        <li role="presentation">
          <a
            href="#tabs-reviews"
            class="block border-x-0 border-b-2 border-t-0 border-transparent px-7 py-6 text-sm font-medium leading-tight text-slate-700 hover:isolate hover:border-transparent focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary"
            data-te-toggle="pill"
            data-te-target="#tabs-reviews"
            role="tab"
            aria-controls="tabs-reviews"
            aria-selected="false"
          >
            <i class="fa-solid fa-star"></i>
            Reviews
          </a>
        </li>
      </ul>

      <!--Tabs content-->
      <div class="mb-6">
        <div
          class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block px-10 py-5"
          id="tabs-description"
          role="tabpanel"
          aria-labelledby="tabs-description-tab"
          data-te-tab-active
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quos doloribus
          eveniet praesentium commodi veritatis nam dolores ad dolorem! Tempore sequi laborum,
          molestias repellat tenetur voluptate, ad quae quisquam itaque architecto enim soluta
          incidunt voluptas facilis, rem nesciunt eos a necessitatibus pariatur veritatis error.
          Perspiciatis quia corporis iste velit sunt reprehenderit, aliquam, ratione, natus et
          tempora ex provident eum? Esse error animi recusandae laboriosam nisi facere ea
          praesentium magnam rerum excepturi quia odit, quod voluptatum. A, at dicta amet ea quod
          vitae quam mollitia sapiente ex? Nihil impedit ratione saepe eum, quasi quo voluptates
          aspernatur alias. Ut, magni eius.

          <br />

          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum optio quisquam facere
          ipsam corrupti, aspernatur doloremque non accusamus sed dignissimos dicta vitae neque
          inventore reprehenderit libero fugiat! Perferendis deleniti, iure dolor, nam assumenda,
          repellendus eos dolorem officiis ipsa iste ipsam commodi magnam consequatur laboriosam non
          quaerat velit fuga nostrum fugiat earum saepe repellat eum facilis sint. Dicta, quam! Odit
          ullam natus eos neque, eveniet, magnam est quis sed dolorem distinctio corrupti ipsa nihil
          ut reiciendis esse amet eaque voluptate rem id eum, totam modi. Blanditiis dolor modi
          magni nemo quia illum, nobis autem iste! Mollitia, odit! Laborum, adipisci, sunt obcaecati
          rem a facilis aspernatur repudiandae fuga sit odio fugit consectetur. Corporis, aliquam
          eum. Numquam, optio, in quibusdam eos dolorem adipisci quam omnis labore unde dolores modi
          eligendi? Nobis, illo tenetur officiis rem numquam eaque in itaque velit voluptas
          consequuntur omnis at eos nam corporis cupiditate aut. Quam iusto nisi nihil minima quae
          vitae odit mollitia voluptatum consequatur magni minus numquam accusamus eaque beatae
          alias amet illo dolore, iure, dolorem deleniti? Voluptates voluptatem, tenetur nihil
          eveniet eos doloremque delectus, in minima aliquam aliquid totam! Cumque unde veniam
          saepe. Laudantium, odit itaque? Eveniet laborum architecto impedit nihil! Assumenda
          dolorum quo modi provident.
        </div>
        <div
          class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-reviews"
          role="tabpanel"
          aria-labelledby="tabs-reviews-tab"
        >
          This is reviews
        </div>
      </div>
    </div>
  </div>
</template>
