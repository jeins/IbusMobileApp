import {ToastController, ActionSheetController, Platform, LoadingController, Loading} from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import _ from 'lodash';

declare var cordova: any;

export class ImageHandler {
    public loading: Loading;
    public imageFileName: string;
    private apiImageUri: string;

    constructor(
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public platform: Platform,
                public loadingCtrl: LoadingController
    ) {
        this.apiImageUri = "http://ibus.mjuan.me/image";
        this.imageFileName = '';
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

    public setImageFile(img){
        if(_.includes(img, this.apiImageUri)){
            let tmpSplit = img.split('/');
            this.imageFileName = tmpSplit[tmpSplit.length - 2] + '.' + tmpSplit[tmpSplit.length - 1];
        } else{
            this.imageFileName = img;
        }
    }

    public getImageUri(){
        if(this.imageFileName != ''){
            let tmpImg = this.imageFileName.split('.');

            return this.apiImageUri + '/' + tmpImg[0] + '/' + tmpImg[1];
        }

        return '';
    }

    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        let options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        Camera.getPicture(options).then((imagePath) => {
            this.imageFileName = this.createFileName();

            if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                FilePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.imageFileName);
                    });
            } else {
                let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.imageFileName);
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }

    private createFileName() {
        let d = new Date(),
            n = d.getTime(),
            newFileName =  n + ".jpg";
        return newFileName;
    }

    private copyFileToLocalDir(namePath, currentName, newFileName) {
        File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.uploadImage();
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

    public pathForImage() {
        if (this.imageFileName === '') {
            return '';
        } else {
            return cordova.file.dataDirectory + this.imageFileName;
        }
    }

    public uploadImage() {
        // File for Upload
        let targetPath = this.pathForImage();

        // File name only
        let filename = this.imageFileName;

        let options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            httpMethod: 'POST'
        };

        const fileTransfer = new Transfer();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, this.apiImageUri, options).then(data => {
            this.loading.dismissAll();
            this.presentToast('Image succesful uploaded.');
        }, err => {
            this.loading.dismissAll();
            this.presentToast('Error while uploading file.');
        });
    }
}