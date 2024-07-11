/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord',  'N/http','N/log', 'N/record', 'N/url'],
    /**
     * @param{currentRecord} currentRecord
     * @param{log} log
     * @param{record} record
     * @param{url} url
     *  @param{https} https
     */
    function (currentRecord,  https,log, record, url) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {
            try {

                var feeRecord = scriptContext.currentRecord;
                var fieldId = scriptContext.fieldId;
                console.log("entered client script");


                if (fieldId === 'custrecord3' && fieldId === 'custrecord_jj_stu_transaction') {

                    var languageId = feeRecord.getValue({ fieldId: 'custrecord3' });
                    var transactionId = feeRecord.getValue({ fieldId: 'custrecord_jj_stu_transaction' });

                    console.log('languageid:' + languageId);


                    var languageRecord = record.load({
                        type: 'customrecord_jj_fee_record',
                        id: languageId,

                    });
                    console.log('languagerecord:' + languageRecord);

                    var feeAmount = languageRecord.getValue({ fieldId: 'custrecord_jj_fee_amount' });

                    console.log('feeamount' + feeAmount);

                    var baseCurrency = 'INR';


                    const apiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rXIk4josNS3Q3GAAkFN8J6oEhM99LHkI7AAaOvY2&currencies=EUR%2CUSD%2CJPY&base_currency=INR';

                    
                    const response = https.get({
                        url: apiUrl
                    });

                    // Check if the response is successful
                    if (response.code === 200) {
                        return JSON.parse(response.body); 
                    } else {
                        throw new Error(`HTTP Error: ${response.code} - ${response.body}`);
                    }

                    var exchangeRate = 3.11;
                    var exchangeValue = feeAmount * exchangeRate;


                    var suiteletUrl = url.resolveScript({
                        deploymentId: 'customdeploy_jj_sl_student_record',
                        scriptId: 'customscript_jj_sl_student_record',
                        params: {
                            studentFeeAmount: feeAmount,
                            studentBaseCurrency: baseCurrency,
                            studentExchangeValue: exchangeValue
                        }
                    });

                    console.log('Suitelet URL', suiteletUrl);

                    // if (feeAmount && baseCurrency && exchangeValue) {
                    //     window.location.href = suiteletUrl;
                    // }
                }

            } catch (e) {
                log.error({
                    title: 'Error in fieldChanged function',
                    details: e.message
                });
            }


        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function lineInit(scriptContext) {

        }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        function validateField(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateLine(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is inserted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateDelete(scriptContext) {

        }

        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {

        }

        return {
            // pageInit: pageInit,
            fieldChanged: fieldChanged
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
