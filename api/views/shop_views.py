from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import *
from api.serializers import ShopSerializer


@api_view(['GET'])
def getShops(request):
    user = request.query_params.get('user', None)
    level = request.query_params.get('level', None)
    if user:
        shops = Shop.objects.filter(user=user)
    elif level:
        shops = Shop.objects.filter(level=level)
    else:
        shops = Shop.objects.all()
    serializer = ShopSerializer(shops, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getShop(request, pk):
    shops = Shop.objects.get(id=pk)
    serializer = ShopSerializer(shops, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createShop(request):
    data = request.data
    user = User.objects.get(id=data['id'])
    shop = Shop.objects.create(
        user=user,
        name='Sample Name',
        level=6,
        shop_number=50,
        block='C',
        description=''
    )
    serializer = ShopSerializer(shop, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateShop(request, pk):
    data = request.data
    shop = Shop.objects.get(id=pk)

    shop.name = data['name']
    shop.level = data['level']
    shop.shop_number = data['shop_number']
    shop.block = data['block']
    shop.description = data['description']
    shop.save()
    serializer = ShopSerializer(shop, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteShop(request, pk):
    shop = Shop.objects.get(id=pk)
    shop.delete()
    return Response('Shop deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    shop_id = data['shop_id']
    shop = Shop.objects.get(id=shop_id)

    shop.image = request.FILES.get('image')
    shop.save()
    return Response('Image Uploaded')
