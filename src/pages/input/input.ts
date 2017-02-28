import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController, Loading} from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

import { ProductService } from '../../providers/product-service';
import { Category } from '../../providers/category';
import { ShowPage } from '../show/show';

declare var cordova: any;

@Component({
    selector: 'page-input',
    templateUrl: 'input.html'
})
export class InputPage {
    isAddBillImage: boolean;
    product: Object;
    loadCategories: String[] = [];
    private productId;
    private isEdit;
    lastImage: string = null;
    loading: Loading;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public platform: Platform,
                public loadingCtrl: LoadingController,
                private productService: ProductService,
                private category: Category) {

        this.productId = navParams.get('productId');
        this.productService = productService;
        this.isAddBillImage = false;
        this.product = {name: '', description: '', purchasePrice: {currency: 'euro'}, sellingPrice: {currency: 'rupiah'}};
        this.loadCategories = category.getCategory();
        this.isEdit = !!(this.productId);

        if(this.isEdit) this.loadProduct();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputPage');
    }

    onSaveInput() : void{
        let productId;
        let toast = this.toastCtrl.create({
            message: 'product berhasil disave!',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push(ShowPage, {productId});
        });

        if(this.isEdit){
            this.productService
                .updateProduct(this.productId, this.product)
                .subscribe(success => {
                    console.log(success);
                    if(success){
                        productId = this.productId;
                        toast.present();
                    }
                });
        } else{
            this.productService
                .addNewProduct(this.product)
                .subscribe(product => {
                    console.log(product);
                    productId = product.id;
                    toast.present();
                });
        }
    }

    private loadProduct(){
        this.productService.getProductById(this.productId)
            .subscribe(product => {
                this.product = product;

                console.log(this.product);
            });
    }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(Camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        let options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        Camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                FilePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }

    // Create a new name for the image
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName =  n + ".jpg";
        return newFileName;
    }

// Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

// Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        // Destination URL
        var url = "http://ibus.mjuan.me/image";

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'fileName': filename}
        };

        const fileTransfer = new Transfer();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.loading.dismissAll()
            this.presentToast('Image succesful uploaded.');
        }, err => {
            this.loading.dismissAll()
            this.presentToast('Error while uploading file.');
        });
    }
}
