// 链表判断是否有环 如果有返回环的入口节点 没有返回null 思路：遍历保存 如果有重复 那么则有环
function detectCycle(head) {
  let data = new Set();
  while (head) {
    if (data.has(head)) {
      return head;
    }
    data.add(head);
    head = head.next;
  }
  return null;
}
// 判断两个链表是否有交点
function getIntersectionNode(headA, headB) {
  let visited = new Set();
  let temp = headA;
  while (temp) {
    visited.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
}
