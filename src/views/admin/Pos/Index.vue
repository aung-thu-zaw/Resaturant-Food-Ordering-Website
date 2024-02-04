<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import PosProductCard from '@/components/Cards/PosProductCard.vue'
import DashboardTableDataSearchBox from '@/components/Forms/SearchBoxs/DashboardTableDataSearchBox.vue'
import DashboardTableDataPerPageSelectBox from '@/components/Forms/SelectBoxs/DashboardTableDataPerPageSelectBox.vue'
import PosItemDataCell from '@/components/Tables/PosItemDataCell.vue'
import NormalButton from '@/components/Buttons/NormalButton.vue'
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'

useTitle('POS - Restaurant Food Ordering')

const createOrder = ref(false)
const placeOrder = ref(false)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10 space-y-5">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.pos.index" icon="fa-cash-register" label="POS">
          <BreadcrumbItem label="List" />
        </Breadcrumb>
      </div>

      <div
        class="flex flex-col md:flex-row items-start justify-between md:space-y-0 space-y-5 md:space-x-5"
      >
        <div class="w-full md:w-5/12 bg-white border border-gray-200 rounded-md px-8 py-5">
          <div v-if="!createOrder && !placeOrder" class="space-y-10">
            <div>
              <img
                src="https://img.freepik.com/free-vector/cashier-supermarket-isolated-person-smiling-woman-employee-uniform-standing-cash-desk-store-employee-working-grocery-shop-market-retail-commerce_575670-1280.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706400000&semt=ais"
                alt=""
              />
            </div>

            <h1 class="font-bold text-3xl text-purpleDark">Your Order in Progress Check Order</h1>
            <p class="text-md font-medium text-slate-700">
              Click on any item or Add Order Button to create order
            </p>

            <NormalButton
              @click="createOrder = true"
              class="w-full bg-purpleDark text-white rounded-full"
            >
              Create Order
            </NormalButton>
          </div>

          <div
            v-if="createOrder && !placeOrder"
            class="flex flex-col overflow-hidden rounded-md space-y-5"
          >
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 rounded-md">
                  <table class="min-w-full text-center text-sm font-light bg-white overflow-hidden">
                    <thead class="border-b font-bold bg-gray-100 text-slate-800">
                      <tr>
                        <th scope="col" class="border-r px-4 py-3">Item</th>
                        <th scope="col" class="border-r px-4 py-3">Price + Addons</th>
                        <th scope="col" class="border-r px-4 py-3">Quantity</th>
                        <th scope="col" class="border-r px-4 py-3">Total</th>
                        <th scope="col" class="px-4 py-3">Clear</th>
                      </tr>
                    </thead>
                    <tbody>
                      <PosItemDataCell />
                      <PosItemDataCell />
                      <PosItemDataCell />
                      <PosItemDataCell />
                      <PosItemDataCell />
                      <PosItemDataCell />
                      <PosItemDataCell />
                      <PosItemDataCell />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="space-y-2.5 text-sm">
              <div class="font-bold flex items-center justify-between w-full text-purpleDark">
                <span> Total Items : </span>
                <span> 10 Item(s) </span>
              </div>
              <div class="font-bold flex items-center justify-between w-full text-purpleDark">
                <span> Sub Total : </span>
                <span> $ 350 </span>
              </div>
            </div>

            <div class="flex items-center justify-between space-x-5 w-full">
              <NormalButton @click="placeOrder = true" class="w-full bg-orange-500 text-white">
                <i class="fa-solid fa-basket"></i>
                Place Order
              </NormalButton>
              <NormalButton @click="createOrder = false" class="w-full bg-purpleDark text-white">
                <i class="fa-solid fa-basket"></i>
                Cancel
              </NormalButton>
            </div>
          </div>

          <div v-if="placeOrder" class="flex flex-col overflow-hidden rounded-md space-y-5">
            <h1 class="font-semibold text-purpleDark text-lg p-1.5">Amount to Pay $46.00</h1>

            <div class="space-y-5 p-1.5">
              <div>
                <InputLabel label="Select Table" required />

                <SelectBox
                  name="table"
                  :options="[
                    {
                      label: 'Table 1',
                      value: 'table-1'
                    },
                    {
                      label: 'Table 2',
                      value: 'table-2'
                    },
                    {
                      label: 'Table 3',
                      value: 'table-3'
                    },
                    {
                      label: 'Table 4',
                      value: 'table-4'
                    },
                    {
                      label: 'Table 5',
                      value: 'table-5'
                    }
                  ]"
                  required
                />

                <!-- <InputError :message="store.errors?.status" /> -->
              </div>

              <div class="grid grid-cols-2 gap-5">
                <div>
                  <InputLabel label="Payment Method" required />

                  <SelectBox
                    name="payment-method"
                    :options="[
                      {
                        label: 'Cash',
                        value: 'cash'
                      },
                      {
                        label: 'Card',
                        value: 'card'
                      }
                    ]"
                    required
                  />

                  <!-- <InputError :message="store.errors?.status" /> -->
                </div>

                <div>
                  <InputLabel label="Order Type" required />

                  <SelectBox
                    name="order-type"
                    :options="[
                      {
                        label: 'Takeaway',
                        value: 'takeaway'
                      },
                      {
                        label: 'Dine-in',
                        value: 'dine-in'
                      }
                    ]"
                    required
                  />

                  <!-- <InputError :message="store.errors?.status" /> -->
                </div>
              </div>
            </div>

            <div class="border p-5 rounded-md space-y-5">
              <h1 class="font-bold text-slate-600 mb-5">Customer Info (Optional)</h1>
              <div>
                <InputLabel label="Customer Name" />

                <InputField type="text" name="name" placeholder="Enter Customer Name" />

                <!-- <InputError :message="store.errors?.name" /> -->
              </div>
              <div>
                <InputLabel label="Customer Phone" />

                <InputField type="text" name="phone" placeholder="Enter Customer Phone" />

                <!-- <InputError :message="store.errors?.name" /> -->
              </div>
            </div>

            <div class="space-x-5 flex items-center justify-between">
              <NormalButton @click="placeOrder = true" class="w-full bg-orange-500 text-white">
                <i class="fa-solid fa-basket"></i>
                Submit
              </NormalButton>
              <NormalButton @click="placeOrder = false" class="w-full bg-purpleDark text-white">
                <i class="fa-solid fa-basket"></i>
                Cancel
              </NormalButton>
            </div>
          </div>
        </div>

        <div class="w-full md:w-7/12 p-5 bg-white border border-gray-200 rounded-md">
          <div>
            <div
              class="my-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center justify-between overflow-auto p-1 space-x-3"
            >
              <DashboardTableDataSearchBox placeholder="Search by product name" />

              <div class="space-x-5 flex items-center">
                <div>
                  <select
                    id="filter-by-category"
                    class="p-3 py-3.5 font-medium text-xs text-gray-700 rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
                  >
                    <option selected disabled>Filter By Menu Category</option>
                    <option value="5">Main Courses</option>
                    <option value="5">Salads</option>
                    <option value="5">Seafood</option>
                    <option value="5">Desserts</option>
                    <option value="5">Breakfast</option>
                    <option value="5">Kids Menu</option>
                    <option value="5">Burgers</option>
                    <option value="5">Pasta</option>
                    <option value="5">Vegetarian</option>
                    <option value="5">Drinks</option>
                  </select>
                </div>
              </div>

              <DashboardTableDataPerPageSelectBox />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
            <PosProductCard />
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
