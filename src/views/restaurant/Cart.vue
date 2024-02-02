<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { useTitle } from '@vueuse/core'
import { onMounted } from 'vue'

useTitle('Cart - Restaurant Food Ordering')

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <AppLayout>
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <h1 class="font-bold text-4xl text-purpleDark">Shopping Cart</h1>

        <div data-aos="fade-in" data-aos-duration="1000">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 rounded-md">
                  <table class="min-w-full text-center text-md font-light bg-white overflow-hidden">
                    <thead class="border-b font-bold bg-orange-500 text-white">
                      <tr>
                        <th scope="col" class="border-r px-6 py-4">Image</th>
                        <th scope="col" class="border-r px-6 py-4">Details</th>
                        <th scope="col" class="border-r px-6 py-4">Price</th>
                        <th scope="col" class="border-r px-6 py-4">Quantity</th>
                        <th scope="col" class="border-r px-6 py-4">Total</th>
                        <th scope="col" class="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b text-center font-bold text-purpleDark">
                        <td class="border-r py-4">
                          <div class="flex items-center justify-center">
                            <img
                              src="https://media.istockphoto.com/id/1165063882/photo/restaurant-healthy-food-delivery-in-take-away-boxes.jpg?s=612x612&w=0&k=20&c=IOC4sN-T-cCobmHE13NY_ml27Us6VK81SdTpdoFO2uw="
                              alt=""
                              class="h-20 object-contain"
                            />
                          </div>
                        </td>
                        <td class="border-r px-6 py-4 space-y-3 text-left">
                          <h3 class="hover:text-orange-500 text-lg font-bold">
                            Hyderabadi Biryani
                          </h3>
                          <div class="flex flex-col items-start space-y-2">
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="border-r px-6 py-4">
                          <div class="flex items-center justify-center">
                            <div
                              class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full"
                            >
                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-plus text-white"></i>
                              </button>

                              <input
                                type="number"
                                value="1"
                                class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
                              />

                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-minus text-white"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="px-6 py-4">
                          <button class="hover:text-orange-500 duration-150 text-xl font-bold">
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                      <tr class="border-b text-center font-bold text-purpleDark">
                        <td class="border-r py-4">
                          <div class="flex items-center justify-center">
                            <img
                              src="https://media.istockphoto.com/id/1165063882/photo/restaurant-healthy-food-delivery-in-take-away-boxes.jpg?s=612x612&w=0&k=20&c=IOC4sN-T-cCobmHE13NY_ml27Us6VK81SdTpdoFO2uw="
                              alt=""
                              class="h-20 object-contain"
                            />
                          </div>
                        </td>
                        <td class="border-r px-6 py-4 space-y-3 text-left">
                          <h3 class="hover:text-orange-500 text-lg font-bold">
                            Hyderabadi Biryani
                          </h3>
                          <div class="flex flex-col items-start space-y-2">
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="border-r px-6 py-4">
                          <div class="flex items-center justify-center">
                            <div
                              class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full"
                            >
                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-plus text-white"></i>
                              </button>

                              <input
                                type="number"
                                value="1"
                                class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
                              />

                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-minus text-white"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="px-6 py-4">
                          <button class="hover:text-orange-500 duration-150 text-xl font-bold">
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                      <tr class="border-b text-center font-bold text-purpleDark">
                        <td class="border-r py-4">
                          <div class="flex items-center justify-center">
                            <img
                              src="https://media.istockphoto.com/id/1165063882/photo/restaurant-healthy-food-delivery-in-take-away-boxes.jpg?s=612x612&w=0&k=20&c=IOC4sN-T-cCobmHE13NY_ml27Us6VK81SdTpdoFO2uw="
                              alt=""
                              class="h-20 object-contain"
                            />
                          </div>
                        </td>
                        <td class="border-r px-6 py-4 space-y-3 text-left">
                          <h3 class="hover:text-orange-500 text-lg font-bold">
                            Hyderabadi Biryani
                          </h3>
                          <div class="flex flex-col items-start space-y-2">
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="border-r px-6 py-4">
                          <div class="flex items-center justify-center">
                            <div
                              class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full"
                            >
                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-plus text-white"></i>
                              </button>

                              <input
                                type="number"
                                value="1"
                                class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
                              />

                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-minus text-white"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="px-6 py-4">
                          <button class="hover:text-orange-500 duration-150 text-xl font-bold">
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                      <tr class="border-b text-center font-bold text-purpleDark">
                        <td class="border-r py-4">
                          <div class="flex items-center justify-center">
                            <img
                              src="https://media.istockphoto.com/id/1165063882/photo/restaurant-healthy-food-delivery-in-take-away-boxes.jpg?s=612x612&w=0&k=20&c=IOC4sN-T-cCobmHE13NY_ml27Us6VK81SdTpdoFO2uw="
                              alt=""
                              class="h-20 object-contain"
                            />
                          </div>
                        </td>
                        <td class="border-r px-6 py-4 space-y-3 text-left">
                          <h3 class="hover:text-orange-500 text-lg font-bold">
                            Hyderabadi Biryani
                          </h3>
                          <div class="flex flex-col items-start space-y-2">
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="border-r px-6 py-4">
                          <div class="flex items-center justify-center">
                            <div
                              class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full"
                            >
                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-plus text-white"></i>
                              </button>

                              <input
                                type="number"
                                value="1"
                                class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
                              />

                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-minus text-white"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="px-6 py-4">
                          <button class="hover:text-orange-500 duration-150 text-xl font-bold">
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                      <tr class="border-b text-center font-bold text-purpleDark">
                        <td class="border-r py-4">
                          <div class="flex items-center justify-center">
                            <img
                              src="https://media.istockphoto.com/id/1165063882/photo/restaurant-healthy-food-delivery-in-take-away-boxes.jpg?s=612x612&w=0&k=20&c=IOC4sN-T-cCobmHE13NY_ml27Us6VK81SdTpdoFO2uw="
                              alt=""
                              class="h-20 object-contain"
                            />
                          </div>
                        </td>
                        <td class="border-r px-6 py-4 space-y-3 text-left">
                          <h3 class="hover:text-orange-500 text-lg font-bold">
                            Hyderabadi Biryani
                          </h3>
                          <div class="flex flex-col items-start space-y-2">
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                            <button type="button" class="text-xs text-orange-500">
                              More Cheese ( + 20 $ )
                            </button>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="border-r px-6 py-4">
                          <div class="flex items-center justify-center">
                            <div
                              class="flex items-center space-x-1.5 border border-gray-300 p-1 rounded-full"
                            >
                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-plus text-white"></i>
                              </button>

                              <input
                                type="number"
                                value="1"
                                class="w-[50px] border-none font-semibold text-sm text-gray-800 outline-none border text-center bg-transparent"
                              />

                              <button
                                type="button"
                                class="focus:ring-2 focus:ring-orange-300 bg-orange-500 hover:bg-orange-600 mr-2 rounded-full text-xs w-8 h-8 flex items-center justify-center"
                              >
                                <i class="fa-solid fa-minus text-white"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="border-r px-6 py-4">$180.00</td>
                        <td class="px-6 py-4">
                          <button class="hover:text-orange-500 duration-150 text-xl font-bold">
                            <i class="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end">
            <div class="border border-gray-200 bg-white shadow-sm rounded-md mb-5 p-5 w-[500px]">
              <h2 class="text-center mb-5 font-bold text-xl text-gray-800">Order Summary</h2>
              <ul class="space-y-3 text-sm font-semibold mb-5">
                <li class="flex justify-between text-gray-700">
                  <span>Total Items:</span>
                  <span>5 Items</span>
                </li>

                <li class="flex justify-between text-gray-700">
                  <span>Total Items Price:</span>
                  <span>$ 100</span>
                </li>

                <li class="flex justify-between text-gray-700">
                  <span>Delivery:</span>
                  <span>$ 10</span>
                </li>

                <li class="flex justify-between text-gray-700">
                  <span>Coupon Code:</span>
                  <span class="text-yellow-600 text-sm font-bold">
                    Global Usage
                    <button class="text-gray-700 cursor-pointer hover:text-red-600">
                      <i class="fas fa-xmark"></i>
                    </button>
                  </span>
                </li>

                <!-- <li v-show="coupon" class="flex justify-between text-gray-700">
                    <span>Coupon Discount:</span>
                    <span v-if="coupon?.type === 'fixed'" class="text-gray-700 text-sm font-bold">
                      - $ {{ formatAmount(coupon.value) }}
                    </span>
                    <span
                      v-else-if="coupon?.type === 'percentage'"
                      class="text-gray-700 text-sm font-bold"
                    >
                      - % {{ coupon.value }}
                    </span>
                  </li> -->

                <li class="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                  <span>Total Price:</span>
                  <span> $ 150.45</span>
                </li>
              </ul>

              <div class="space-y-3">
                <button
                  type="button"
                  class="px-4 py-3 inline-block text-sm w-full text-center font-semibold text-white bg-orange-600 shadow-sm border border-gray-200 rounded-md hover:bg-orange-700 duration-200"
                >
                  <i class="fa-solid fa-right-from-bracket"></i>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('../../assets/images/chef-cover.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

.scrollbar::-webkit-scrollbar {
  height: 10px;
}
</style>