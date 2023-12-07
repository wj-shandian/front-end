# 问题集合

## error: unable to rewind rpc post data - try increasing http.postBuffer

error: unable to rewind rpc post data - try increasing http.postBuffer
error: RPC failed; curl 65 HTTP/2 stream 7 was reset
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly

意思是 http.postBuffer 设置的太小了，需要设置大一点。

`git config --global http.postBuffer 524288000` 设置大一点即可.

