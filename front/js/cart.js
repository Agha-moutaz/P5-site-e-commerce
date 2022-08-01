
  class Cart{
      constructor(){
        this. storage = {}
      }
      
      getTotal (kanaps) {
        let results = []
        let articles = this.getResume(kanaps);
        let totalQty = 0;
        let totalPrice = 0;
        for (let article in articles){
          totalQty+=parseInt(articles[article].quantity,10);
          totalPrice+=articles[article].total;
        }
        return [totalQty, totalPrice];
      }
    
     getResume (kanaps) {
        let results = []
    
        for (let cart_id in this.storage) {
          let quantity = this.storage[cart_id]
    
          let parts = cart_id.split('_')
    
          let kanap_id = parts[0]
          let color = parts[1]

          let kanaps_found = kanaps.filter(function (c) {
            return c._id == kanap_id
          })
    
          if (kanaps_found.length > 0) {
            let mykanap = kanaps_found[0]
    
            results.push({
              color,
              cart_id,
              kanap_id,
              quantity,
              total: quantity * mykanap.price,
              unitPrice: mykanap.price,
              description: mykanap.description,
              imageUrl: mykanap.imageUrl,
              name: mykanap.name,
              altTxt: mykanap.altTxt
            })
          }
        }
    
        return results
      }
    
      setToStorage  (cart_id, quantity) {
        this.storage[cart_id.trim()] = quantity
      }
      add  (_id, color, quantity) {
        this.storage[(_id + '_' + color). trim()] = quantity
      }
    
     remove  (_id, color, quantity) {
        /*console.log("remove function!");*/
        var key = _id + '_' + color
        if (!this.storage[key]) {
          return
           /* console.log(this.remove)*/
        } else if (this.storage[key] <= quantity) {
          delete this.storage[key]
        } else {
          this.storage[key] -= quantity
        }
      }
    
      save () {
        localStorage.setItem('cart', JSON.stringify(this.storage))
      }
    
      load  () {
        if (localStorage.getItem('cart')) {
          this.storage = JSON.parse(localStorage.getItem('cart'))
        }
      }
      getProductsId(){
        let productsInfo = []
        for ( let cart_id in this.storage) {
          let id = cart_id.split("_")[0]
          productsInfo.push(id);
        }
        return productsInfo;
      }
  }

  
