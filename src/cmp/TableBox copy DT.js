import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function TableBox(){
    
    const tstyle = {
        headRow: {
            style: {
                fontFamily: 'Lato',
                fontSize: '1.05em',
                fontWeight: 600,
                minHeight: "50px",
                wrap: true,
                whiteSpace: 'break-spaces',
            }
        }
    };

    const columns = [
        {name: 'Application', selector: (row) => row.id, sortable: true},
        {name: 'Item', selector: (row) => row.title, sortable: true},
        {name: 'Code', selector: (row) => row.category, sortable: true},
        {name: 'Environment', selector: (row) => row.price, sortable: true},
        {name: 'Area', selector: (row) => row.image, sortable: true},
        {name: 'SubArea', selector: (row) => row.action, sortable: true},
        {name: 'Timestamp', selector: (row) => row.action, sortable: true},
        {name: 'Status', selector: (row) => row.price, sortable: true},
    ];

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]); 

    const getList=async()=> {
        try{
            const req=await fetch("https://fakestoreapi.com/products");
            const res=await req.json();
            setData(res);
            setFilter(res);

        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        const result=data.filter((item)=>{
            return item.title.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return( 
        <React.Fragment>  
            <DataTable  
                    columns={columns}
                    data={filter}
                    customStyles={tstyle}
                    fixedHeader
                    highlightOnHover
                    responsive
                    //pagination
                    //paginationPerPage={10}
                    //paginationRowsPerPageOptions={[10, 15, 20]}
                    //filterPlaceholder="Filter"
                    className='ui table blue inverted'
                    searching
                    //hiddenColumns
                    striped
                    subHeader
                        subHeaderComponent={
                            <input type="text" 
                            className="ui button white"
                            placeholder='Search...'
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            />
                        }
                    subHeaderAlign='center'
            />
        </React.Fragment>
    )   
}