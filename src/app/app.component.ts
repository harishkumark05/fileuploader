import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient){}

        uploader: FileUploader = new FileUploader(
          {
            url:'http://localhost:3000/files'
          }
          )
        selectedFile:any;
        progress:number =0;
        message:any
fileSelected(event: any) {

const file:File = event[0];

this.readAsBase64(file).then((result:any) =>{

  this.selectedFile = result;
  // console.log(this.uploader)

}).catch((error:any) => {
  console.log(error)
})

}
readAsBase64(file:any){

  const reader = new FileReader();

  const fileValue = new Promise((res,rej) =>{

reader.addEventListener('load',()=>{
  res(reader.result)
}
);
reader.addEventListener('error',(event)=>{
  rej(event);
})
reader.readAsDataURL(file)
  })
  return fileValue
}
upload(){
  console.log(this.selectedFile);

  this.http.post('http://localhost:3000/files', {file:this.selectedFile},{
    reportProgress:true,
    observe:'events'
  }).subscribe(event  =>{
    this.message = '';
      if(event.type === HttpEventType.UploadProgress){
      
      this.progress = Math.round((100 * event.loaded) / event?.total!);
      // console.log(this.progress.toString())
    } else if (event instanceof HttpResponse) {
      this.message = 'File uploaded successfully!';
    }
  })
  
}
  title = 'fileupload-del';
  

}
