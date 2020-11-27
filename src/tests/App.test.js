import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

import TimerUI from '../App';

test('timer starts', () => {
    render(<TimerUI/>);
    const start = screen.getByText(/Aloita/i);
    expect(start).toBeInTheDocument();
    
    const display = screen.queryByTestId('display');
    expect(display).toBeInTheDocument();
    expect(display).toHaveTextContent('00 : 00 : 00');

    fireEvent.click(start);

  // no 00:00:00 on the screen after clicking start
    setTimeout(() => {
      expect(display).not.toHaveTextContent('00 : 00 : 00');
    },10)
});

test('list says empty message only when empty', () => {
    render (<App />);
    const list = screen.queryByTestId('list');

    expect(list).toBeInTheDocument();

  // has h1 element and 'Lista tyhjä' content initially
    expect(list.childNodes).toHaveLength(2);
    expect(list).toHaveTextContent('Lista tyhjä');

  // submit value and no 'lista tyhjä' content
    const input = screen.queryByTestId('input');
    expect(input).toBeInTheDocument();
    const submit = screen.getByText('Tallenna');
    expect(submit).toBeInTheDocument();
    fireEvent.change(input, {target: {value: "sanax"}});
    fireEvent.click(submit);
    expect(list).not.toHaveTextContent('Lista tyhjä');

  // empty list and expect h1 element and 'tyhjä lista' content
    const clear = screen.getByText('Tyhjennä lista');
    expect(clear).toBeInTheDocument();
    fireEvent.click(clear);
    expect(list.childNodes).toHaveLength(2);
    expect(list).toHaveTextContent('Lista tyhjä');
})

test('list add', () => {
    render (<App />);

    const list = screen.queryByTestId('list');
    expect(list).toBeInTheDocument();
    const input = screen.queryByTestId('input');
    expect(input).toBeInTheDocument();
    const submit = screen.getByText('Tallenna');
    expect(submit).toBeInTheDocument();

    fireEvent.change(input, {target: {value: "sanax"}});
    fireEvent.click(submit);
  // first add is found
    expect(list).toHaveTextContent('sanax');

    fireEvent.change(input, {target: {value: "sanax2"}});
    fireEvent.click(submit);
  // both adds are found and correct list length
    expect(list).toHaveTextContent('sanax');
    expect(list).toHaveTextContent('sanax2');
    expect(list.childNodes).toHaveLength(3);
})