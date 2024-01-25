import guest from '@/middlewares/guest'
import auth from '@/middlewares/auth'
import authorize from '@/middlewares/authorize'
import permission from '@/middlewares/permission'

export default [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/admin/Login.vue'),
    meta: { middleware: [guest] }
  },
  {
    path: '/admin',
    meta: { middleware: [auth, authorize] },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { middleware: [authorize] }
      },
      {
        path: 'categories',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.categories.index',
            component: () => import('@/views/admin/Categories/Index.vue'),
            meta: { middleware: [permission('categories.view')] }
          },
          {
            path: 'create',
            name: 'admin.categories.create',
            component: () => import('@/views/admin/Categories/Create.vue'),
            meta: { middleware: [permission('categories.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.categories.edit',
            props: true,
            component: () => import('@/views/admin/Categories/Edit.vue'),
            meta: { middleware: [permission('categories.edit')] }
          }
        ]
      },
      {
        path: 'products',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.products.index',
            component: () => import('@/views/admin/Products/Index.vue'),
            meta: { middleware: [permission('products.view')] }
          },
          {
            path: 'create',
            name: 'admin.products.create',
            component: () => import('@/views/admin/Products/Create.vue'),
            meta: { middleware: [permission('products.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.products.edit',
            props: true,
            component: () => import('@/views/admin/Products/Edit.vue'),
            meta: { middleware: [permission('products.edit')] }
          }
        ]
      },
      {
        path: '/admin/product-reviews',
        name: 'admin.product-reviews.index',
        component: () => import('@/views/admin/ProductReviews/Index.vue'),
        meta: { middleware: [authorize, permission('product-reviews.view')] }
      },
      {
        path: 'daily-offers',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.daily-offers.index',
            component: () => import('@/views/admin/DailyOffers/Index.vue'),
            meta: { middleware: [permission('daily-offers.view')] }
          },
          {
            path: 'create',
            name: 'admin.daily-offers.create',
            component: () => import('@/views/admin/DailyOffers/Create.vue'),
            meta: { middleware: [permission('daily-offers.create')] }
          },
          {
            path: ':id/edit',
            name: 'admin.daily-offers.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/DailyOffers/Edit.vue'),
            meta: { middleware: [permission('daily-offers.edit')] }
          }
        ]
      },
      {
        path: 'coupons',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.coupons.index',
            component: () => import('@/views/admin/Coupons/Index.vue'),
            meta: { middleware: [permission('coupons.view')] }
          },
          {
            path: 'create',
            name: 'admin.coupons.create',
            component: () => import('@/views/admin/Coupons/Create.vue'),
            meta: { middleware: [permission('coupons.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.coupons.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/Coupons/Edit.vue'),
            meta: { middleware: [permission('coupons.edit')] }
          }
        ]
      },
      {
        path: 'delivery-areas',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.delivery-areas.index',
            component: () => import('@/views/admin/ManageShipping/DeliveryAreas/Index.vue'),
            meta: { middleware: [permission('delivery-areas.view')] }
          },
          {
            path: 'create',
            name: 'admin.delivery-areas.create',
            component: () => import('@/views/admin/ManageShipping/DeliveryAreas/Create.vue'),
            meta: { middleware: [permission('delivery-areas.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.delivery-areas.edit',
            props: true,
            component: () => import('@/views/admin/ManageShipping/DeliveryAreas/Edit.vue'),
            meta: { middleware: [permission('delivery-areas.edit')] }
          }
        ]
      },
      {
        path: 'shipping-methods',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.shipping-methods.index',
            component: () => import('@/views/admin/ManageShipping/ShippingMethods/Index.vue'),
            meta: { middleware: [permission('shipping-methods.view')] }
          },
          {
            path: 'create',
            name: 'admin.shipping-methods.create',
            component: () => import('@/views/admin/ManageShipping/ShippingMethods/Create.vue'),
            meta: { middleware: [permission('shipping-methods.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.shipping-methods.edit',
            props: true,
            component: () => import('@/views/admin/ManageShipping/ShippingMethods/Edit.vue'),
            meta: { middleware: [permission('shipping-methods.edit')] }
          }
        ]
      },
      {
        path: 'tables',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.tables.index',
            component: () => import('@/views/admin/ManageReservation/Tables/Index.vue'),
            meta: { middleware: [permission('tables.view')] }
          },
          {
            path: 'create',
            name: 'admin.tables.create',
            component: () => import('@/views/admin/ManageReservation/Tables/Create.vue'),
            meta: { middleware: [permission('tables.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.tables.edit',
            props: true,
            component: () => import('@/views/admin/ManageReservation/Tables/Edit.vue'),
            meta: { middleware: [permission('tables.edit')] }
          }
        ]
      },
      {
        path: 'reservation-times',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.reservation-times.index',
            component: () => import('@/views/admin/ManageReservation/ReservationTimes/Index.vue'),
            meta: { middleware: [permission('reservation-times.view')] }
          },
          {
            path: 'create',
            name: 'admin.reservation-times.create',
            component: () => import('@/views/admin/ManageReservation/ReservationTimes/Create.vue'),
            meta: { middleware: [permission('reservation-times.create')] }
          }
        ]
      },
      {
        path: 'blog-categories',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.blog-categories.index',
            component: () => import('@/views/admin/ManageBlog/BlogCategories/Index.vue'),
            meta: { middleware: [permission('blog-categories.view')] }
          },
          {
            path: 'create',
            name: 'admin.blog-categories.create',
            component: () => import('@/views/admin/ManageBlog/BlogCategories/Create.vue'),
            meta: { middleware: [permission('blog-categories.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.blog-categories.edit',
            props: true,
            component: () => import('@/views/admin/ManageBlog/BlogCategories/Edit.vue'),
            meta: { middleware: [permission('blog-categories.edit')] }
          }
        ]
      },
      {
        path: 'blog-contents',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.blog-contents.index',
            component: () => import('@/views/admin/ManageBlog/BlogContents/Index.vue'),
            meta: { middleware: [permission('blog-contents.view')] }
          },
          {
            path: 'create',
            name: 'admin.blog-contents.create',
            component: () => import('@/views/admin/ManageBlog/BlogContents/Create.vue'),
            meta: { middleware: [permission('blog-contents.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.blog-contents.edit',
            props: true,
            component: () => import('@/views/admin/ManageBlog/BlogContents/Edit.vue'),
            meta: { middleware: [permission('blog-contents.edit')] }
          }
        ]
      },
      {
        path: '/admin/blog-comments',
        name: 'admin.blog-comments.index',
        component: () => import('@/views/admin/ManageBlog/BlogComments/Index.vue'),
        meta: { middleware: [authorize, permission('blog-comments.view')] }
      },
      {
        path: '/admin/subscribers',
        name: 'admin.subscribers.index',
        component: () => import('@/views/admin/Newsletter/Subscribers/Index.vue'),
        meta: { middleware: [authorize, permission('subscribers.view')] }
      },
      {
        path: '/admin/send-newsletter',
        name: 'admin.send-newsletter',
        component: () => import('@/views/admin/Newsletter/SendNewsletter.vue'),
        meta: { middleware: [authorize, permission('send-newsletter.send')] }
      },
      {
        path: '/admin/menu-stock',
        name: 'admin.menu-stock.index',
        component: () => import('@/views/admin/MenuStock/Index.vue')
        // meta: { middleware: [authorize, permission('subscribers.view')] }
      },
      {
        path: '/admin/permissions',
        name: 'admin.permissions.index',
        component: () => import('@/views/admin/AuthorityManagement/Permissions/Index.vue'),
        meta: { middleware: [authorize, permission('permissions.view')] }
      },
      {
        path: 'roles',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.roles.index',
            component: () => import('@/views/admin/AuthorityManagement/Roles/Index.vue'),
            meta: { middleware: [permission('roles.view')] }
          },
          {
            path: 'create',
            name: 'admin.roles.create',
            component: () => import('@/views/admin/AuthorityManagement/Roles/Create.vue'),
            meta: { middleware: [permission('roles.create')] }
          },
          {
            path: ':id/edit',
            name: 'admin.roles.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/AuthorityManagement/Roles/Edit.vue'),
            meta: { middleware: [permission('roles.edit')] }
          }
        ]
      }
    ]
  }
]
