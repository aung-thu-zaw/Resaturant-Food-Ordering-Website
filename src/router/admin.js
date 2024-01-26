import guest from '@/middlewares/guest'
import auth from '@/middlewares/auth'
import authorize from '@/middlewares/authorize'
import authorizePermission from '@/middlewares/authorizePermission'

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
      /***** Dashboard *****/
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { middleware: [authorize] }
      },

      /***** Category *****/
      {
        path: 'categories',
        children: [
          {
            path: '',
            name: 'admin.categories.index',
            component: () => import('@/views/admin/Categories/Index.vue'),
            meta: { middleware: [authorizePermission('categories.view')] }
          },
          {
            path: 'create',
            name: 'admin.categories.create',
            component: () => import('@/views/admin/Categories/Create.vue'),
            meta: { middleware: [authorizePermission('categories.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.categories.edit',
            props: true,
            component: () => import('@/views/admin/Categories/Edit.vue'),
            meta: { middleware: [authorizePermission('categories.edit')] }
          }
        ]
      },

      /***** Product *****/
      {
        path: 'products',
        children: [
          {
            path: '',
            name: 'admin.products.index',
            component: () => import('@/views/admin/Products/Index.vue'),
            meta: { middleware: [authorizePermission('products.view')] }
          },
          {
            path: 'create',
            name: 'admin.products.create',
            component: () => import('@/views/admin/Products/Create.vue'),
            meta: { middleware: [authorizePermission('products.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.products.edit',
            props: true,
            component: () => import('@/views/admin/Products/Edit.vue'),
            meta: { middleware: [authorizePermission('products.edit')] }
          }
        ]
      },

      /***** Product Review *****/
      {
        path: '/admin/product-reviews',
        name: 'admin.product-reviews.index',
        component: () => import('@/views/admin/ProductReviews/Index.vue'),
        meta: { middleware: [authorizePermission('product-reviews.view')] }
      },

      /***** Daily Offer *****/
      {
        path: 'daily-offers',
        children: [
          {
            path: '',
            name: 'admin.daily-offers.index',
            component: () => import('@/views/admin/DailyOffers/Index.vue'),
            meta: { middleware: [authorizePermission('daily-offers.view')] }
          },
          {
            path: 'create',
            name: 'admin.daily-offers.create',
            component: () => import('@/views/admin/DailyOffers/Create.vue'),
            meta: { middleware: [authorizePermission('daily-offers.create')] }
          },
          {
            path: ':id/edit',
            name: 'admin.daily-offers.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/DailyOffers/Edit.vue'),
            meta: { middleware: [authorizePermission('daily-offers.edit')] }
          }
        ]
      },

      /***** Coupon *****/
      {
        path: 'coupons',
        children: [
          {
            path: '',
            name: 'admin.coupons.index',
            component: () => import('@/views/admin/Coupons/Index.vue'),
            meta: { middleware: [authorizePermission('coupons.view')] }
          },
          {
            path: 'create',
            name: 'admin.coupons.create',
            component: () => import('@/views/admin/Coupons/Create.vue'),
            meta: { middleware: [authorizePermission('coupons.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.coupons.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/Coupons/Edit.vue'),
            meta: { middleware: [authorizePermission('coupons.edit')] }
          }
        ]
      },

      /***** Delivery Area *****/
      {
        path: 'delivery-areas',
        children: [
          {
            path: '',
            name: 'admin.delivery-areas.index',
            component: () => import('@/views/admin/ManageShipping/DeliveryAreas/Index.vue'),
            meta: { middleware: [authorizePermission('delivery-areas.view')] }
          },
          {
            path: 'create',
            name: 'admin.delivery-areas.create',
            component: () => import('@/views/admin/ManageShipping/DeliveryAreas/Create.vue'),
            meta: { middleware: [authorizePermission('delivery-areas.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.delivery-areas.edit',
            props: true,
            component: () => import('@/views/admin/ManageShipping/DeliveryAreas/Edit.vue'),
            meta: { middleware: [authorizePermission('delivery-areas.edit')] }
          }
        ]
      },

      /***** Shipping Method *****/
      {
        path: 'shipping-methods',
        children: [
          {
            path: '',
            name: 'admin.shipping-methods.index',
            component: () => import('@/views/admin/ManageShipping/ShippingMethods/Index.vue'),
            meta: { middleware: [authorizePermission('shipping-methods.view')] }
          },
          {
            path: 'create',
            name: 'admin.shipping-methods.create',
            component: () => import('@/views/admin/ManageShipping/ShippingMethods/Create.vue'),
            meta: { middleware: [authorizePermission('shipping-methods.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.shipping-methods.edit',
            props: true,
            component: () => import('@/views/admin/ManageShipping/ShippingMethods/Edit.vue'),
            meta: { middleware: [authorizePermission('shipping-methods.edit')] }
          }
        ]
      },

      /***** Table *****/
      {
        path: 'tables',
        children: [
          {
            path: '',
            name: 'admin.tables.index',
            component: () => import('@/views/admin/ManageReservation/Tables/Index.vue'),
            meta: { middleware: [authorizePermission('tables.view')] }
          },
          {
            path: 'create',
            name: 'admin.tables.create',
            component: () => import('@/views/admin/ManageReservation/Tables/Create.vue'),
            meta: { middleware: [authorizePermission('tables.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.tables.edit',
            props: true,
            component: () => import('@/views/admin/ManageReservation/Tables/Edit.vue'),
            meta: { middleware: [authorizePermission('tables.edit')] }
          }
        ]
      },

      /***** Reservation Time *****/
      {
        path: 'reservation-times',
        children: [
          {
            path: '',
            name: 'admin.reservation-times.index',
            component: () => import('@/views/admin/ManageReservation/ReservationTimes/Index.vue'),
            meta: { middleware: [authorizePermission('reservation-times.view')] }
          },
          {
            path: 'create',
            name: 'admin.reservation-times.create',
            component: () => import('@/views/admin/ManageReservation/ReservationTimes/Create.vue'),
            meta: { middleware: [authorizePermission('reservation-times.create')] }
          }
        ]
      },

      /***** Blog Categories *****/
      {
        path: 'blog-categories',
        children: [
          {
            path: '',
            name: 'admin.blog-categories.index',
            component: () => import('@/views/admin/ManageBlog/BlogCategories/Index.vue'),
            meta: { middleware: [authorizePermission('blog-categories.view')] }
          },
          {
            path: 'create',
            name: 'admin.blog-categories.create',
            component: () => import('@/views/admin/ManageBlog/BlogCategories/Create.vue'),
            meta: { middleware: [authorizePermission('blog-categories.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.blog-categories.edit',
            props: true,
            component: () => import('@/views/admin/ManageBlog/BlogCategories/Edit.vue'),
            meta: { middleware: [authorizePermission('blog-categories.edit')] }
          }
        ]
      },

      /***** Blog Content *****/
      {
        path: 'blog-contents',
        children: [
          {
            path: '',
            name: 'admin.blog-contents.index',
            component: () => import('@/views/admin/ManageBlog/BlogContents/Index.vue'),
            meta: { middleware: [authorizePermission('blog-contents.view')] }
          },
          {
            path: 'create',
            name: 'admin.blog-contents.create',
            component: () => import('@/views/admin/ManageBlog/BlogContents/Create.vue'),
            meta: { middleware: [authorizePermission('blog-contents.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.blog-contents.edit',
            props: true,
            component: () => import('@/views/admin/ManageBlog/BlogContents/Edit.vue'),
            meta: { middleware: [authorizePermission('blog-contents.edit')] }
          }
        ]
      },

      /***** Blog Comment *****/
      {
        path: '/admin/blog-comments',
        name: 'admin.blog-comments.index',
        component: () => import('@/views/admin/ManageBlog/BlogComments/Index.vue'),
        meta: { middleware: [authorizePermission('blog-comments.view')] }
      },

      /***** Subscriber *****/
      {
        path: '/admin/subscribers',
        name: 'admin.subscribers.index',
        component: () => import('@/views/admin/Newsletter/Subscribers/Index.vue'),
        meta: { middleware: [authorizePermission('subscribers.view')] }
      },

      /***** Send Newsletter *****/
      {
        path: '/admin/send-newsletter',
        name: 'admin.send-newsletter',
        component: () => import('@/views/admin/Newsletter/SendNewsletter.vue'),
        meta: { middleware: [authorizePermission('send-newsletter.send')] }
      },

      /***** Registered Account *****/
      {
        path: '/admin/registered-accounts',
        name: 'admin.registered-accounts.index',
        component: () => import('@/views/admin/AccountManagement/RegisteredAccounts/Index.vue'),
        meta: { middleware: [authorizePermission('registered-accounts.view')] }
      },

      /***** Admin Manage *****/
      {
        path: 'admin-manage',
        children: [
          {
            path: '',
            name: 'admin.admin-manage.index',
            component: () => import('@/views/admin/AccountManagement/AdminManage/Index.vue'),
            meta: { middleware: [authorizePermission('admin-manage.view')] }
          },
          {
            path: 'create',
            name: 'admin.admin-manage.create',
            component: () => import('@/views/admin/AccountManagement/AdminManage/Create.vue'),
            meta: { middleware: [authorizePermission('admin-manage.create')] }
          },
          {
            path: ':id/edit',
            name: 'admin.admin-manage.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/AccountManagement/AdminManage/Edit.vue'),
            meta: { middleware: [authorizePermission('admin-manage.edit')] }
          }
        ]
      },

      /***** Menu Stock *****/
      {
        path: '/admin/menu-stock',
        name: 'admin.menu-stock.index',
        component: () => import('@/views/admin/MenuStock/Index.vue'),
        meta: { middleware: [authorizePermission('subscribers.view')] }
      },

      /***** Permissions *****/
      {
        path: '/admin/permissions',
        name: 'admin.permissions.index',
        component: () => import('@/views/admin/AuthorityManagement/Permissions/Index.vue'),
        meta: { middleware: [authorizePermission('permissions.view')] }
      },

      /***** Roles *****/
      {
        path: 'roles',
        children: [
          {
            path: '',
            name: 'admin.roles.index',
            component: () => import('@/views/admin/AuthorityManagement/Roles/Index.vue'),
            meta: { middleware: [authorizePermission('roles.view')] }
          },
          {
            path: 'create',
            name: 'admin.roles.create',
            component: () => import('@/views/admin/AuthorityManagement/Roles/Create.vue'),
            meta: { middleware: [authorizePermission('roles.create')] }
          },
          {
            path: ':id/edit',
            name: 'admin.roles.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () => import('@/views/admin/AuthorityManagement/Roles/Edit.vue'),
            meta: { middleware: [authorizePermission('roles.edit')] }
          }
        ]
      },

      /***** Assign Role Permissions *****/
      {
        path: 'assign-role-permissions',
        children: [
          {
            path: '',
            name: 'admin.assign-role-permissions.index',
            component: () =>
              import('@/views/admin/AuthorityManagement/AssignRolePermissions/Index.vue'),
            meta: { middleware: [authorizePermission('assign-role-permissions.view')] }
          },
          {
            path: ':id/edit',
            name: 'admin.assign-role-permissions.edit',
            props: (route) => ({ id: Number(route.params.id) }),
            component: () =>
              import('@/views/admin/AuthorityManagement/AssignRolePermissions/Edit.vue'),
            meta: { middleware: [authorizePermission('assign-role-permissions.edit')] }
          }
        ]
      },

      /***** Database Backup *****/
      {
        path: '/admin/database-backups',
        name: 'admin.database-backups.index',
        component: () => import('@/views/admin/DatabaseBackups/Index.vue'),
        meta: { middleware: [authorize, authorizePermission('database-backups.view')] }
      }
    ]
  }
]
