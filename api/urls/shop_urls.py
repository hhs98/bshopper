from django.urls import path

from api.views import shop_views as views

urlpatterns = [
    path('', views.getShops, name='shops'),

    path('create/', views.createShop, name='shop-create'),
    path('upload/', views.uploadImage, name='shop-image-upload'),

    path('<str:pk>/', views.getShop, name='shop'),

    path('update/<str:pk>/', views.updateShop, name='shop-update'),
    path('delete/<str:pk>/', views.deleteShop, name='shop-delete'),
]
