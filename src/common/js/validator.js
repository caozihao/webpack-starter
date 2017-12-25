class Validator {
  /**
   * name  ex：手机号
   * value  ex: 13564410428
  */
  constructor({ dom, closestNode, validators }) {
    this.dom = dom;
    this.closestNode = closestNode;
    this.validators = validators;
  }

  setErrorDom(node, msg) {
    if (!node.next('.error_tip').length) {
      node.after(`<span class="error_tip">${msg}</span>`);
    }
  }

  removeErrorDom(node) {
    if (node.next('.error_tip').length) {
      node.next('.error_tip').remove();
    }
  }

  getValue() {
    return this.dom.value;
  }

  setValidate(value) {
    const dom = this.dom;
    const validators = this.validators;
    const closestNode = this.closestNode;

    if (!dom) {
      // console.log('目标dom不能为空');
      return;
    }

    if (!closestNode) {
      // console.log('目标父级dom不能为空');
      return;
    }

    // closest():jquery 方法
    const $cNode = $(dom).closest(closestNode);
    let flag = false;

    if (validators && validators.length) {

      validators.sort(function (a, b) {
        return a.rank - b.rank;
      })

      validators.some((v, i) => {

        if (v.value !== null && v.value !== undefined) {
          if (v.value === value) {
            this.setErrorDom($cNode, v.msg)
            flag = true;
            return true;
          }
        } else if (v.reg) {
          const regx = new RegExp(v.reg, "g");
          if (!regx.test(value)) {
            this.setErrorDom($cNode, v.msg)
            flag = true;
            return true;
          }
        }
      })

      // 移除错误信息;
      if (!flag) {
        this.removeErrorDom($cNode);
        return true;
      } else {
        return false;
      }

    }

  }
}

export default Validator;