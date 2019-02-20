import { Component, Type, OnInit, OnDestroy} from '@angular/core';
import {SafePipe} from '../pipe';
import {PdfService} from '../pdf.service';
declare var $: any;

@Component({
  selector: 'example-bar',
  templateUrl: './ex.example.html',
  styleUrls: ['./ex.component.css']
})
export class ExampleComponent implements OnInit{
  title = 'Venkatesh';
  resultData = [];
  imgPath:string = "/assets/";
  showPDF:boolean = false;
  pdfData = [{"name": "PDF 1", "fname":"pdf1.pdf"}, {"name": "PDF 2", "fname":"pdf2.pdf"}, {"name": "PDF 3", "fname":"pdf3.pdf"}, {"name": "PDF 4", "fname":"pdf4.pdf"}, {"name": "PDF 5", "fname":"pdf5.pdf"}];
  path = 'abc';
  sampleJSONData = [
    {
        id: 0,
        title: 'choice 1',
        value: 'choice 1'
    }, {
        id: 1,
        title: 'choice 2',
        value: 'choice 2',
        subs: [
            {
                id: 10,
                title: 'choice 2 1',
                value: 'choice 2 1'
            }, {
                id: 11,
                title: 'choice 2 2',
                value: 'choice 2 2'
            }, {
                id: 12,
                title: 'choice 2 3',
                value: 'choice 2 3'
            }
        ]
    }, {
        id: 2,
        title: 'choice 3',
        value: 'choice 3'
    }, {
        id: 3,
        title: 'choice 4',
        value: 'choice 4'
    }, {
        id: 4,
        title: 'choice 5',
        value: 'choice 5'
    }, {
        id: 5,
        title: 'choice 6',
        value: 'choice 6',
        subs: [
            {
                id: 50,
                title: 'choice 6 1',
                value: 'choice 6 1'
            }, {
                id: 51,
                title: 'choice 6 2',
                value: 'choice 6 2'
            }
        ]
    }, {
        id: 6,
        title: 'choice 7',
        value: 'choice 7'
    }
];

    constructor(private pdfService: PdfService) { }

    isItemInArray(item, arr) {
          for (var i=0; i<arr.length; i++) {
            if (item.id == arr[i].id && item.value == arr[i].value) {
                return i + "";
              }
          }
          return false;
    }

    refreshInputVal() {
        var value = "";
        if (this.resultData.length > 1) {
            for (var i=0; i<this.resultData.length; i++){
                value += this.resultData[i].text;
                if (i<this.resultData.length-1)
                    value += ", ";
            }
        }
        else if(this.resultData.length == 1){
            value = this.resultData[0].text;
        }

        $('#justAnInputBox').val(value);
       }

   ngOnInit() {
     this.pdfService.getPdf()
                              .subscribe(
                                res => {
                                  console.log("Response", res);
                                  this.pdfData = res;
                                }
                                );
        $('#justAnInputBox').comboTree({source : this.sampleJSONData, isMultiple: true});
        $('.comboTreeItemTitle').each(function() {
          if($(this).closest('ul').closest('li').find('.comboTreeItemTitle').find('input[type="checkbox"]').length) {
            $(this).attr('disabled', true);
            $(this).css('pointer-events', 'none');
            $(this).find('input[type="checkbox"]').attr('disabled', true);
          }
        });
        let jQueryInstance = this;
        $('.comboTreeItemTitle').on('click', function(e) {
          if(e.checked || e.currentTarget.firstChild.checked) {
            jQueryInstance.resultData.push({"id": e.currentTarget.dataset.id, "text": e.currentTarget.dataset.value });
          } else {
            var selectedItem = {"id": e.currentTarget.dataset.id, "text": e.currentTarget.dataset.value };
            var index = jQueryInstance.isItemInArray(selectedItem, jQueryInstance.resultData);
            if (index) {
              jQueryInstance.resultData.splice(parseInt(index), 1);
            }
          }
          if($(this).closest('li').find('.comboTreeItemTitle').length > 1 && e.currentTarget.firstChild.checked) {
            $(this).closest('li').find('.comboTreeItemTitle').each(function(){
              $(this).css('pointer-events', 'auto');
              $(this).find('input[type="checkbox"]').attr('disabled', false);
            });
          } else {
            if($(this).closest('li').find('.comboTreeItemTitle').length > 1) {
              $(this).closest('li').find('.comboTreeItemTitle').each(function(index) {
                if(index > 0) {
                  $(this).find('input[type="checkbox"]').prop('checked', false);
                  var selectedItem = {"id": $(this).attr("data-id"), "text": $(this).attr("data-value")};
                  var result = jQueryInstance.isItemInArray(selectedItem, jQueryInstance.resultData);
                  if (result) {
                    jQueryInstance.resultData.splice(parseInt(result), 1);
                  }
                  $(this).find('input[type="checkbox"]').attr('disabled', true);
                  $(this).css('pointer-events', 'none');
                }
              });
            }
          }
          jQueryInstance.refreshInputVal();
      });
    }

    ShowPDF(data) {
      this.showPDF = true;
      this.path = this.imgPath + data.fname;
    }

    closePDF() {
      this.showPDF = false;
    }
}
