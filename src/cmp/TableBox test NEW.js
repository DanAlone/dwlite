import React from 'react';
import DataTable from 'react-data-table-component';


        function TableBox({boxtable}) {

            const columns = [
                {name: 'Application', selector: 'application', sortable: true},
                {name: 'Item', selector: 'item', sortable: true},
                {name: 'Code', selector: 'code', sortable: true},
                {name: 'Environment', selector: 'environment', sortable: true},
                {name: 'Area', selector: 'area', sortable: true},
                {name: 'SubArea', selector: 'subarea', sortable: true},
                {name: 'Timestamp', selector: 'timestamp', sortable: true},
                {name: 'Status', selector: 'status', sortable: true},
            ];
            
            return( 
                <>    
                <DataTable  
                        columns={columns}
                        data={boxtable}
                        pagination
                        highlightOnHover
                        responsive
                        paginationPerPage={7}
                        paginationRowsPerPageOptions={[5, 10, 20]}
                >
                </DataTable>
                </>
            )
        }

export default TableBox;