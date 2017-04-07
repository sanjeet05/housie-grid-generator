
        function list_to_table1(listy) {
            var length_list = length(listy);
            // Assuming all elements are of equal length
            var length_elements = length(listy[0]);
            document.write('<table border=3 cellspacing="2" bgcolor="pink" style="float: left">');
            // converts to list of list with each inner list as the first elements of each original
            function verticalize(lst, list_length, html_string) {
                if (is_empty_list(head(lst))) {
                    document.write(html_string + '</tr>');
                } else if (list_length === 0) {
                    document.write(html_string + '</tr>');
                    return verticalize(lst, length_list, '<tr>');
                } else {
                    var new_string = html_string + '<td>' + head(head(lst)) + '</td>';
                    var updated_lst = append(tail(lst), list(tail(head(lst))));
                    return verticalize(updated_lst, list_length - 1, new_string);
                }
            }
            verticalize(listy, length_list, '<tr>');
            document.write('</table>');
            // document.write('<table border=1 style="float: left"> 
            //                 <tr> <td>_</td></tr><tr> <td>_</td></tr>
            //                 <tr> <td>_</td></tr> </table>');
        }

        function list_to_table2(listy) {
            var length_list = length(listy);
            // Assuming all elements are of equal length
            var length_elements = length(listy[0]);
            document.write('<table border=3 cellspacing="2" bgcolor="lightblue" style="float: left">');
            // converts to list of list with each inner list as the first elements of each original
            function verticalize(lst, list_length, html_string) {
                if (is_empty_list(head(lst))) {
                    document.write(html_string + '</tr>');
                } else if (list_length === 0) {
                    document.write(html_string + '</tr>');
                    return verticalize(lst, length_list, '<tr>');
                } else {
                    var new_string = html_string + '<td>' + head(head(lst)) + '</td>';
                    var updated_lst = append(tail(lst), list(tail(head(lst))));
                    return verticalize(updated_lst, list_length - 1, new_string);
                }
            }

            verticalize(listy, length_list, '<tr>');
            document.write('</table>');
            // document.write('<table border=1 style="float: left"> 
            //                 <tr> <td>_</td></tr><tr> <td>_</td></tr>
            //                 <tr> <td>_</td></tr> </table>');
        }

        function create_table() {
            var numbers = make_housie();
            document.write('<p>');
            list_to_table1(numbers);
            document.write('<p>');
            list_to_table2(make_housie());
            document.write('<p>');
            list_to_table1(make_housie());
            document.write('<p>');
            list_to_table2(make_housie());
            document.write('<p>');
            list_to_table1(make_housie());
            document.write('<p>');
            list_to_table2(make_housie());
            document.write('<p>');
            // list_to_table1(make_housie());
            // document.write('<p>');
            document.getElementById("demo").innerHTML = numbers;
        }

        function create_table3(x) {
            var m = make_housie;
            var t1 = list_to_table1;
            var t2 = list_to_table2;
            function helper(count) {
                if (count === 0) {
                    t1(m());
                    t2(m());
                } else {
                    t1(m());
                    t2(m());
                    return helper(count - 1);
                }
            }
            return helper(x);
        }

        function grids() {
            document.write('<table> <button onclick="create_table3(35)">Generate</button>');
            document.write('<FORM> <INPUT TYPE="button" onClick="history.go(0)" VALUE="Refresh"> </FORM> </table>')
        }

        //----------------------------------------------------------//
        function generate_random_between(from, to) {
            var ran = Math.floor(to * Math.random());
            if (ran < from || ran > to) {
                return generate_random_between(from, to);
            } else {
                return ran;
            }
        }

        function sort(xs) {
            function small(lst) {
                function helper(xs, larges) {
                    if (is_empty_list(xs)) {
                        return larges;
                    } else if (head(xs) <= larges) {
                        return helper(tail(xs), head(xs));
                    } else {
                        return helper(tail(xs), larges);
                    }
                }
                return helper(lst, 10000000000000);
            }
            var smallest = small(xs);
            if (is_empty_list(xs)) {
                return [];
            } else {
                return pair(smallest, sort(remove(smallest, xs)));
            }
        }
        // display(sort(list(3, 5, 7, 9, 23, 6, 45, 567)));
        // display(generate_random_between(10, 20));
        function sum_list(lst) {
            if (is_empty_list(lst)) {
                return 0;
            } else {
                return head(lst) + sum_list(tail(lst));
            }
        }

        function generate_list_lengths() {
            var lengths = list(generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4),
                generate_random_between(1, 4));
            if (sum_list(lengths) === 15) {
                return lengths;
            } else {
                return generate_list_lengths();
            }
        }

        var lengths_list = [];
        function generate_column(x) {
            var length = list_ref(((lengths_list)), x - 1);
            display("Length is " + length);
            var start = (x - 1) * 10 + 1;
            display("Start is " + start);
            var end = start + 9;
            display("End is " + end);
            var used_so_far = [];
            function helper(len) {
                var ran = generate_random_between(start, end);
                if (len === length) {
                    return [];
                } else if (!is_empty_list(member(ran, used_so_far))) {
                    return helper(len);
                } else {
                    used_so_far = pair(ran, used_so_far);
                    return pair(ran, helper(len + 1));
                }
            }
            return helper(0);
        }

        function add_blanks(xs) {
            function add_blank(xs) {
                var len = length(xs);
                var rand = generate_random_between(0, len + 1);
                var remaining = xs;
                function helper(count, lst) {
                    if (count === rand) {
                        return pair(" ", remaining);
                    } else {
                        remaining = tail(remaining);
                        return pair(head(lst), helper(count + 1, tail(lst)));
                    }
                }
                return helper(0, xs);
            }
            if (length(xs) === 2) {
                return add_blank(xs);
            } else if (length(xs) === 1) {
                return add_blank(add_blank(xs));
            } else {
                return xs;
            }
        }

        function make_housie() {
            lengths_list = generate_list_lengths();
            // display(lengths_list);
            var fun = generate_column;
            return map(add_blanks, map(sort, list(fun(1), fun(2), fun(3), fun(4), fun(5), fun(6), fun(7),
                fun(8), fun(9))));
        }

