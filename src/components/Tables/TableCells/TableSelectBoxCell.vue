<script setup>
// Your Code
</script>


<template>
  <td class="px-6 py-4">
    <div class="w-[120px]">
      <select
        class="rounded-md p-2.5 w-full text-sm text-gray-700 font-medium border border-gray-300 focus:ring-2 transition-all focus:ring-slate-300 focus:border-gray-400 outline-none"
      >
        <option disabled>Select an option</option>
        <option value="draft">Draft</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  </td>
</template>