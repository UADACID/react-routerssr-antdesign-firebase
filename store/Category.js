import {observable} from 'mobx-react';
import firebase from '../lib/Firebase';

class Category {

	@observable models = [];

  findAll(){
    let self = this;
    const ref = firebase.database().ref('category');
    ref.on("value", function(snapshot) {
      // self.models = []; // set ulang agar tidak terjadi penumpukan data
      const tempModel = []; // menyimpan sementara array
      if (snapshot.val()) {
        snapshot.forEach(function(childSnapshot) {
            let key = childSnapshot.key;
            let childData = childSnapshot.val();
            // console.log(childData);
            childData.id = key;
            // data.push(childData);
            tempModel.push(childData);
        });
      }
      // console.log(data);

      self.models=tempModel;
      console.log(JSON.stringify(self.models));
    });
  }

}

const category = new Category();
export default category
