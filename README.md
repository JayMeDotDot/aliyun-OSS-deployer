# aliyun-oss-deployer

通过 GitHub Action 来配置 阿里云OSS 的工具

## 前提条件

- 已开通阿里云对象存储OSS服务。
- 已创建RAM用户的AccessKey ID和AccessKey Secret。
  由于云账号AccessKey拥有所有API的访问权限，建议使用RAM用户的AccessKey。如果部署在服务端，请使用RAM或STS的方式进行API访问或日常运维管控操作；如果部署在客户端，请使用STS方式进行API访问。

## 配置项

OSS(option) 中的各项配置说明（[下表如有问题参考官方文档](https://help.aliyun.com/document_detail/64097.html)）

| 配置项 | 类型 | 描述 |
| - | - | - |
| accessKeyId | String | 通过阿里云控制台创建的AccessKey ID。 |
| accessKeySecret | String | 通过阿里云控制台创建的AccessKey Secret。 |
| stsToken | String | 使用临时授权方式。更多信息，请参见使用STS进行临时授权。 |
| bucket | String | 通过控制台或PutBucket创建的Bucket。 |
| endpoint | String | OSS访问域名。 |
| region | String | Bucket所在的区域， 默认值为oss-cn-hangzhou。 |
| internal | Boolean | 是否使用阿里云内网访问，默认值为false。例如通过ECS访问OSS，则设置internal为true，采用internal的endpoint可节省费用。|
| cname | Boolean | 是否支持上传自定义域名，默认值为false。如果设置cname为true，则endpoint传入自定义域名时，自定义域名需要先和Bucket进行绑定。 |
| isRequestPay | Boolean | Bucket是否开启请求者付费模式，默认值为false。更多信息，请参见请求者付费模式。 |
| secure | Boolean | 设置secure为true，则使用HTTPS；设置secure为false，则使用HTTP。更多信息，请参见常见问题。 |
| timeout | String \| Number | 超时时间，默认值为60000，单位为毫秒。 |

## [配置样式](example.yml)
```yml
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run deploy
        uses: JayMeDotDot/aliyun-OSS-deployer@v1.0.0
        with:
          access-key-id: ${{ secrets.ALICLOUDOSS_KEY_ID }}
          access-key-secret: ${{ secrets.ALICLOUDOSS_KEY_SECRET }}
          region: 'your-region'
          bucket: 'your-bucket'
```