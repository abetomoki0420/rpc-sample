const protobuf = require('google-protobuf');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// プロトコル定義をロード
const packageDefinition = protoLoader.loadSync('math.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// プロトコル定義からコードを生成
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const mathPackage = protoDescriptor.mathPackage;

// サーバーを作成し、サービスを実装
const server = new grpc.Server();
server.addService(mathPackage.Math.service, {
  add: (call, callback) => {
    const result = call.request.a + call.request.b;
    callback(null, { result });
  }
});

// サーバーを起動
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server started on port 50051');
});