/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/email', 'N/http', 'N/https', 'N/log', 'N/record', 'N/runtime', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{http} http
 * @param{https} https
 * @param{log} log
 * @param{record} record
 * @param{runtime} runtime
 * @param{serverWidget} serverWidget
 */
    (email, http, https, log, record, runtime, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {


            if(scriptContext.request.method === 'GET'){
                var form = serverWidget.createForm({
                    title : 'Student Record Form'
                })


                 // Binding clientScript by its document id in file cabinet
                 form.clientScriptFileId = 1064;

                form.addField({
                    id :'custrecord_jj_stu_name',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Name'
                }).isMandatory = true;

                form.addField({
                    id :'custrecord_jj_stu_country',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Country'
                }).isMandatory = true;

                form.addField({
                    id : 'custrecord_jj_stu_age',
                    type : serverWidget.FieldType.INTEGER,
                    label :'Age'
                }).isMandatory=true;

                form.addField({
                    id : 'custrecord_jj_stu_phone',
                    type : serverWidget.FieldType.PHONE,
                    label : 'Phone'
                }).isMandatory=true;

                form.addField({
                    id : 'custrecord_jj_stu_email',
                    type : serverWidget.FieldType.EMAIL,
                    label :'Email Address'
                }).isMandatory=true;
               

              
                var selectField = form.addField({
                    id: 'custrecord3',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Language',
                
                });
                selectField.isMandatory = true;
               
                selectField.addSelectOption({
                    value: ' ',
                    text: ' '
                });
 
                selectField.addSelectOption({
                    value: 1,
                    text: 'English'
                });
                selectField.addSelectOption({
                    value: 2,
                    text: 'French'
                });
                selectField.addSelectOption({
                    value: 3,
                    text: 'German'
                });
 

                form.addField({
                    id :'custrecord_jj_stu_base',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Base Currency'
                });

                var selectField = form.addField({
                    id: 'custrecord_jj_stu_transaction',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Transaction Currency',
                    
                });
                selectField.isMandatory = true;
               
                selectField.addSelectOption({
                    value: ' ',
                    text: ' '
                });
 
                selectField.addSelectOption({
                    value: 1,
                    text: 'EURO'
                });
                selectField.addSelectOption({
                    value: 2,
                    text: 'US Dollar'
                });
                selectField.addSelectOption({
                    value: 3,
                    text: 'Japanese Yen'
                });



                form.addField({
                    id : 'custrecord_jj_stu_amount',
                    type : serverWidget.FieldType.CURRENCY,
                    label : 'Fee Amount'
                });


                form.addField({
                    id : 'custrecord_jj_exchange',
                    type : serverWidget.FieldType.CURRENCY,
                    label : 'Exchange Rate'
                });



                form.addSubmitButton({
                    label :'Submit'
                });
                scriptContext.response.writePage(form);

        
            try{
                
            var name = scriptContext.request.parameters.custrecord_jj_stu_name;
            var country = scriptContext.request.parameters.custrecord_jj_stu_country;
            var age = scriptContext.request.parameters.custrecord_jj_stu_age;
            var phone = scriptContext.request.parameters.custrecord_jj_stu_phone;
            var email = scriptContext.request.parameters.custrecord_jj_stu_email;
            var language = scriptContext.request.parameters.custrecord3;
            var baseCurrency = scriptContext.request.parameters.studentBaseCurrency;
            var transactionCurrency = scriptContext.request.parameters.custrecord_jj_stu_transaction;
            var feeAmount = scriptContext.request.parameters.studentFeeAmount;
            var exchangeRate= scriptContext.request.parameters.studentExchangeValue;
            
            log.debug('Name:'+name);
            log.debug('language:'+language);
            log.debug('base currency:'+baseCurrency);
            log.debug('transaction currency:'+transactionCurrency);
            log.debug('feeamount:'+feeAmount);
            log.debug('Exchange rate:'+exchangeRate);

            // Create Registation 
            

        

            var regRecord = record.create({
                type: 'customrecord_jj_student_fee_record',
                isDynamic: true
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_name',
                value: name
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_country',
                value: country
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_age',
                value: age
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_phone',
                value: phone
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_email',
                value: email
            });

            regRecord.setValue({
                fieldId: 'custrecord3',
                value: language
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_base',
                value: baseCurrency
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_transaction',
                value: transactionCurrency
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_stu_amount',
                value: feeAmount
            });

            regRecord.setValue({
                fieldId: 'custrecord_jj_exchange',
                value: exchangeRate
            });

            var regId = regRecord.save();

            scriptContext.response.write(`Student record created successfully with ID: ${regId}<br>`);
            let adminEmail = -5;


            email.send({
                author: runtime.getCurrentUser().id,
                recipients: adminEmail,
                subject: 'Tuition Fee Query Received for Training',
                body: 'A new Student fee Record is created'+regId
            });
            
        
      }catch(e){
        log.debug('Error Creating Student Fee record'+e.message);
      }
    }
    }

        return {onRequest}

    });
