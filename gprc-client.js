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

// クライアントを作成
const client = new mathPackage.Math('localhost:50051', grpc.credentials.createInsecure());

// RPCを呼び出し
const request = { a: 1, b: 2 };
client.add(request, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Result: ${response.result}`);
  }
});