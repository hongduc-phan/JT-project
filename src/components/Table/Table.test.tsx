import React from 'react';
import renderer from 'react-test-renderer';

import {Table, TableHead, TableBody, TableRow, TableCell} from './index';

describe('<Sidebar />', () => {
  const TableConatiner = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Department</TableCell>
          <TableCell>Salary</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>HR</TableCell>
          <TableCell>8000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sales</TableCell>
          <TableCell>4000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Engineering</TableCell>
          <TableCell>7000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Finance</TableCell>
          <TableCell>3000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  it('Should match table snapshot', () => {
    const table = TableConatiner();
    const tree = renderer.create(table).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
