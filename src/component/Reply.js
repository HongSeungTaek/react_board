import {useState, useEffect} from 'react';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Reply({ data }) {
  const fndelReply = (replyId) => {
    if(window.confirm('삭제하시겠습니까?')) {
      axios.post('reply/del', {
        'replyId': replyId
      }).then(function(res) {
        alert('삭제')
      });
    }
  }
  return (<>
      <div>{data.content}<a onClick={() => {fndelReply(data.replyId)}}>X</a></div>
    </>
  );
}

export default Reply;