// const fs = require("fs");
// let writer = fs.createWriteStream("datas/test2");
// var count = 0;
// function writeOneMillionTimes(writer, data, encoding, callback) {
//     let i = 1000000;
//     write();
//     function write() {
//       let ok = true;
//       count++;
//       console.log(count);
//       do {
//         i--;
//         if (i === 0) {
//           // last time!
//           writer.write(data, encoding, callback);
//         } else {
//           // see if we should continue, or wait
//           // don't pass the callback, because we're not done yet.
//           ok = writer.write(data, encoding);
//         }
//       } while (i > 0 && ok);
//       if (i > 0) {
//         // had to stop early!
//         // write some more once it drains
//         //writer.once('drain', write);
//         console.log("back pressure");
//       }
//     }
//   }

//   writeOneMillionTimes(writer, 
//     (function(){ 
//       var str = ""; 
//       for (var i = 0; i < 10; i++) 
//         str+="test"; return str+"\n";
//     })(), 
//     "utf-8", 
//     function() {
//       console.log("all completed!");
//   })

// const fs = require("fs");
// let writer = fs.createWriteStream("datas/test3");
// console.log(writer.writableHighWaterMark);
// //writer.cork();
// writer.write('some ');
// writer.write('data ');
// setTimeout(function() {
//     console.log(writer.writableLength);
// }, 0)

//process.nextTick(() => stream.uncork());


// function writeOneMillionTimes(writer, data, encoding, callback) {
//     let i = 10000;
//     write();
//     function write() {
//       let ok = true;
//       while(i-- > 0 && ok) {
//         // 写入结束时回调
//         ok = writer.write(data, encoding, i === 0 ? callback : null);
//       }
//       if (i > 0) {
//         // 这里提前停下了，'drain' 事件触发后才可以继续写入  
//         console.log('drain', i);
//         writer.once('drain', write);
//       }
//     }
// }

// const Writable = require('stream').Writable;
// const writer = new Writable({
//   write(chunk, encoding, callback) {
//     // 比 process.nextTick() 稍慢
//     setTimeout(() => {
//       callback && callback();
//     });
//   }
// });

// writeOneMillionTimes(writer, 'simple', 'utf8', () => {
//   console.log('end');
// });

const Readable = require('stream').Readable;

// Stream 实现
class MyReadable extends Readable {
  constructor(dataSource, options) {
    super(options);
    this.dataSource = dataSource;
  }
  // 继承了 Readable 的类必须实现这个函数
  // 触发系统底层对流的读取
  _read() {
    const data = this.dataSource.makeData();
    this.push(data);
  }
}

// 模拟资源池
const dataSource = {
  data: new Array(10).fill('-'),
  // 每次读取时 pop 一个数据
  makeData() {
    if (!dataSource.data.length) return null;
    return dataSource.data.pop();
  }
};

const myReadable = new MyReadable(dataSource);
myReadable.setEncoding('utf8');
//myReadable.pause();
console.log(myReadable.read())
myReadable.on('readable', function() {
  // there is some data to read now
  let data;
  console.log(this.read());
  
});

// myReadable.pause();
// console.log('pause');

// myReadable.on('data', (chunk) => {
//   console.log(chunk); 
// });

// setTimeout(function() {
//   myReadable.resume()
// }, 3000);

const { Transform } = require('stream');

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // ...
  }
  transform(chunk, encoding, callback) {
    // ...
  }
}

