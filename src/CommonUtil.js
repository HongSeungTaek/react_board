import Const from './Const';
const CommonUtil = {

  createPagination(page, totalCnt, pageCnt) {
    let _pagination = {};
    let lastPage = Math.ceil(totalCnt / pageCnt);
    let list = [];
    let start = (Math.ceil(page/Const.PAGINATION_COUNT)-1)*Const.PAGINATION_COUNT+1;

    for(var i=0; i<Const.PAGINATION_COUNT && start+i <= lastPage; i++) {
      list.push(start+i);
    }

    _pagination.prev = (page > Const.PAGINATION_COUNT);
    _pagination.prevValue = list[0]-1;
    _pagination.list = list;
    _pagination.next = (list[list.length-1] < lastPage);
    _pagination.nextValue = list[list.length-1]+1;

    return _pagination;
  }

}

export default CommonUtil;