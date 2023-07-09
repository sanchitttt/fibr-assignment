'use client';
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSession } from 'next-auth/react';
import Loader from '@/app/components/loader';
import { redirect, usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import config from '@/app/config/config';
import axios from 'axios';


function ViewResponses() {
    const { data: session, status } = useSession();
    const pathname = usePathname().split('/')[3];
    const { data, isLoading } = useQuery({
        queryKey: [`responses`, pathname],
        queryFn: () => axios.get(`${config.BACKEND_ENDPOINT}/quiz/responses/${pathname}`)
    })
    if (status === 'loading' || isLoading) {
        return <Loader />
    }
    if (!session) {
        redirect('/')
    }
    if (data) {
        if (data.data.createdBy !== session?.user?.email) {
            redirect('/');
            return null;
        }

    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Response number</TableCell>
                        <TableCell align="center">Submitted by</TableCell>
                        <TableCell align="center">Score Gained&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.responseDetails.map((details) => {
                        return details.map((item, idx) => {
                            console.log(item)
                            return <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell  align="center" component="th" scope="row">
                                    {idx}
                                </TableCell>
                                <TableCell align="center">{item.submittedBy}</TableCell>
                                <TableCell align="center">{item.scoreGained}</TableCell>
                            </TableRow>
                        })
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ViewResponses