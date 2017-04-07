 //PREDEFINED METHODS 
        function array_test(x) {
            if (Array.isArray === undefined) {
                return x instanceof Array;
            } else {
                return Array.isArray(x);
            }
        }
        // pair constructs a pair using a two-element array
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function pair(x, xs) {
            return [x, xs];
        }
        // is_pair returns true iff arg is a two-element array
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function is_pair(x) {
            return array_test(x) && x.length === 2;
        }
        // head returns the first component of the given pair,
        // throws an exception if the argument is not a pair
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function head(xs) {
            if (is_pair(xs)) {
                return xs[0];
            } else {
                throw new Error("head(xs) expects a pair as " +
                    "argument xs, but encountered " + xs);
            }
        }
        // tail returns the second component of the given pair
        // throws an exception if the argument is not a pair
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function tail(xs) {
            if (is_pair(xs)) {
                return xs[1];
            } else {
                throw new Error("tail(xs) expects a pair as " +
                    "argument xs, but encountered " + xs);
            }
        }
        // is_empty_list returns true if arg is []
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function is_empty_list(xs) {
            if (array_test(xs)) {
                if (xs.length === 0) {
                    return true;
                } else if (xs.length === 2) {
                    return false;
                } else {
                    throw new Error("is_empty_list(xs) expects empty list " +
                        "or pair as argument xs, but encountered " + xs);
                }
            } else {
                return false;
            }
        }
        // is_list recurses down the list and checks that it ends with the empty list []
        // does not throw any exceptions
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function is_list(xs) {
            for (;; xs = tail(xs)) {
                if (is_empty_list(xs)) {
                    return true;
                } else if (!is_pair(xs)) {
                    return false;
                }
            }
        }
        // list makes a list out of its arguments
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function list() {
            var the_list = [];
            for (var i = arguments.length - 1; i >= 0; i--) {
                the_list = pair(arguments[i], the_list);
            }
            return the_list;
        }
        function length(xs) {
            for (var i = 0; !is_empty_list(xs); ++i) {
                xs = tail(xs);
            }
            return i;
        }
        // map applies first arg f to the elements of the second argument,
        // assumed to be a list.
        // f is applied element-by-element:
        // map(f,[1,[2,[]]]) results in [f(1),[f(2),[]]]
        // map throws an exception if the second argument is not a list,
        // and if the second argument is a non-empty list and the first
        // argument is not a function.
        function map(f, xs) {
            return (is_empty_list(xs)) ? [] :
                pair(f(head(xs)), map(f, tail(xs)));
        }
        // build_list takes a non-negative integer n as first argument,
        // and a function fun as second argument.
        // build_list returns a list of n elements, that results from
        // applying fun to the numbers from 0 to n-1.
        function build_list(n, fun) {
            function build(i, fun, already_built) {
                if (i < 0) {
                    return already_built;
                } else {
                    return build(i - 1, fun, pair(fun(i),
                        already_built));
                }
            }
            return build(n - 1, fun, []);
        }
        // for_each applies first arg fun to the elements of the list passed as
        // second argument. fun is applied element-by-element:
        // for_each(fun,[1,[2,[]]]) results in the calls fun(1) and fun(2).
        // for_each returns true.
        // for_each throws an exception if the second argument is not a list,
        // and if the second argument is a non-empty list and the
        // first argument is not a function.
        function for_each(fun, xs) {
            if (!is_list(xs)) {
                throw new Error("for_each expects a list as argument xs, but " +
                    "encountered " + xs);
            }
            for (; !is_empty_list(xs); xs = tail(xs)) {
                fun(head(xs));
            }
            return true;
        }
        // list_to_string returns a string that represents the argument list.
        // It applies itself recursively on the elements of the given list.
        // When it encounters a non-list, it applies toString to it.
        function list_to_string(l) {
            if (array_test(l) && l.length === 0) {
                return "[]";
            } else {
                if (!is_pair(l)) {
                    return l.toString();
                } else {
                    return "[" + list_to_string(head(l)) + "," + list_to_string(tail(l)) + "]";
                }
            }
        }
        // reverse reverses the argument list
        // reverse throws an exception if the argument is not a list.
        function reverse(xs) {
            if (!is_list(xs)) {
                throw new Error("reverse(xs) expects a list as argument xs, but " +
                    "encountered " + xs);
            }
            var result = [];
            for (; !is_empty_list(xs); xs = tail(xs)) {
                result = pair(head(xs), result);
            }
            return result;
        }

        // append first argument list and second argument list.
        // In the result, the [] at the end of the first argument list
        // is replaced by the second argument list
        // append throws an exception if the first argument is not a list
        function append(xs, ys) {
            if (is_empty_list(xs)) {
                return ys;
            } else {
                return pair(head(xs), append(tail(xs), ys));
            }
        }

        // member looks for a given first-argument element in a given
        // second argument list. It returns the first postfix sublist
        // that starts with the given element. It returns [] if the
        // element does not occur in the list
        function member(v, xs) {
            for (; !is_empty_list(xs); xs = tail(xs)) {
                if (head(xs) === v) {
                    return xs;
                }
            }
            return [];
        }

        // removes the first occurrence of a given first-argument element
        // in a given second-argument list. Returns the original list
        // if there is no occurrence.
        function remove(v, xs) {
            if (is_empty_list(xs)) {
                return [];
            } else {
                if (v === head(xs)) {
                    return tail(xs);
                } else {
                    return pair(head(xs), remove(v, tail(xs)));
                }
            }
        }

        // Similar to remove. But removes all instances of v instead of just the first
        function remove_all(v, xs) {
            if (is_empty_list(xs)) {
                return [];
            } else {
                if (v === head(xs)) {
                    return remove_all(v, tail(xs));
                } else {
                    return pair(head(xs), remove_all(v, tail(xs)))
                }
            }
        }

        // for backwards-compatibility
        var removeAll = remove_all;
        // equal computes the structural equality
        // over its arguments
        function equal(item1, item2) {
            if (is_pair(item1) && is_pair(item2)) {
                return equal(head(item1), head(item2)) &&
                    equal(tail(item1), tail(item2));
            } else if (array_test(item1) && item1.length === 0 &&
                array_test(item2) && item2.length === 0) {
                return true;
            } else {
                return item1 === item2;
            }
        }

        // assoc treats the second argument as an association,
        // a list of (index,value) pairs.
        // assoc returns the first (index,value) pair whose
        // index equal (using structural equality) to the given
        // first argument v. Returns false if there is no such
        // pair
        function assoc(v, xs) {
            if (is_empty_list(xs)) {
                return false;
            } else if (equal(v, head(head(xs)))) {
                return head(xs);
            } else {
                return assoc(v, tail(xs));
            }
        }

        // filter returns the sublist of elements of given list xs
        // for which the given predicate function returns true.
        function filter(pred, xs) {
            if (is_empty_list(xs)) {
                return xs;
            } else {
                if (pred(head(xs))) {
                    return pair(head(xs), filter(pred, tail(xs)));
                } else {
                    return filter(pred, tail(xs));
                }
            }
        }

        // enumerates numbers starting from start,
        // using a step size of 1, until the number
        // exceeds end.

        function enum_list(start, end) {
            if (start > end) {
                return [];
            } else {
                return pair(start, enum_list(start + 1, end));
            }
        }

        // Returns the item in list lst at index n (the first item is at position 0)
        function list_ref(xs, n) {
            if (n < 0) {
                throw new Error("list_ref(xs, n) expects a positive integer as " +
                    "argument n, but encountered " + n);
            }
            for (; n > 0; --n) {
                xs = tail(xs);
            }
            return head(xs);
        }

        // accumulate applies given operation op to elements of a list
        // in a right-to-left order, first apply op to the last element
        // and an initial element, resulting in r1, then to the
        // second-last element and r1, resulting in r2, etc, and finally
        // to the first element and r_n-1, where n is the length of the
        // list.
        // accumulate(op,zero,list(1,2,3)) results in
        // op(1, op(2, op(3, zero)))
        function accumulate(op, initial, sequence) {
            if (is_empty_list(sequence)) {
                return initial;
            } else {
                return op(head(sequence),
                    accumulate(op, initial, tail(sequence)));
            }
        }

        // set_head(xs,x) changes the head of given pair xs to be x,
        // throws an exception if the argument is not a pair
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function set_head(xs, x) {
            if (is_pair(xs)) {
                xs[0] = x;
                return undefined;
            } else {
                throw new Error("set_head(xs,x) expects a pair as " +
                    "argument xs, but encountered " + xs);
            }
        }

        // set_tail(xs,x) changes the tail of given pair xs to be x,
        // throws an exception if the argument is not a pair
        // LOW-LEVEL FUNCTION, NOT JEDISCRIPT
        function set_tail(xs, x) {
            if (is_pair(xs)) {
                xs[1] = x;
                return undefined;
            } else {
                throw new Error("set_tail(xs,x) expects a pair as " +
                    "argument xs, but encountered " + xs);
            }
        }

        // Stream_library:
        function stream_tail(s) {
            return (tail(s))();
        }

        function stream_ref(s, n) {
            if (n === 0) {
                return head(s);
            } else {
                return stream_ref(stream_tail(s), n - 1);
            }
        }

        function stream_map(f, s) {
            if (is_empty_list(s)) {
                return [];
            } else {
                return pair(f(head(s)),
                    function() {
                        return stream_map(f, stream_tail(s));
                    });
            }
        }

        function stream_filter(pred, s) {
            if (is_empty_list(s)) {
                return [];
            } else if (pred(head(s))) {
                return pair(head(s),
                    function() {
                        return stream_filter(pred, stream_tail(s));
                    });
            } else {
                return stream_filter(pred, stream_tail(s));
            }
        }

        function stream_for_each(f, s) {
            if (is_empty_list(s)) {
                return true;
            } else {
                f(head(s));
                return stream_for_each(f, stream_tail(s));
            }
        }
        function enum_stream(start, end) {
            if (start > end) {
                return [];
            } else {
                return pair(start,
                    function() {
                        return enum_stream(start + 1, end);
                    });
            }
        }

        function eval_stream(s, n) {
            if (n === 0) {
                return [];
            } else {
                return pair(head(s),
                    eval_stream(stream_tail(s), n - 1));
            }
        }

        function integers_from(n) {
            return pair(n, function() {
                return integers_from(n + 1);
            });
        }

        function add_streams(s1, s2) {
            if (is_empty_list(s1)) {
                return s2;
            } else if (is_empty_list(s2)) {
                return s1;
            } else {
                return pair(head(s1) + head(s2),
                    function() {
                        return add_streams(stream_tail(s1), stream_tail(s2));
                    });
            }
        }

        function mul_streams(s1, s2) {
            if (is_empty_list(s1)) {
                return s2;
            } else if (is_empty_list(s2)) {
                return s1;
            } else {
                return pair(head(s1) * head(s2),
                    function() {
                        return mul_streams(stream_tail(s1), stream_tail(s2));
                    });
            }
        }

        function div_streams(s1, s2) {
            if (is_empty_list(s1)) {
                return s2;
            } else if (is_empty_list(s2)) {
                return s1;
            } else {
                return pair(head(s1) / head(s2),
                    function() {
                        return div_streams(stream_tail(s1), stream_tail(s2));
                    });
            }
        }

        function scale_stream(s, f) {
            return stream_map(function(x) {
                return x * f;
            }, s);
        }

        function stream_append(xs, ys) {
            if (is_empty_list(xs)) {
                return ys;
            } else {
                return pair(head(xs),
                    function() {
                        return stream_append(stream_tail(xs),
                            ys);
                    });
            }
        }

        function list_to_stream(lst) {
            if (is_empty_list(lst)) {
                return [];
            } else {
                return pair(head(lst), function() {
                    return list_to_stream(tail(lst));
                });
            }
        }

        function stream_to_list(stream) {
            if (is_empty_list(stream)) {
                return [];
            } else {
                return pair(head(stream), stream_to_list(stream_tail(stream)));
            }
        }

        function interleave(s1, s2) {
            if (is_empty_list(s1)) {
                return s2;
            } else {
                return pair(head(s1),
                    function() {
                        return interleave(s2,
                            stream_tail(s1));
                    });
            }
        }

        var integers = integers_from(1);
        var ones = pair(1, function() {
            return ones;
        });

        function display(x) {
            console.log(x);
        }

        function make_stack() {
            return pair([], []);
        }

        function push(item, stack) {
            set_tail(stack, head(stack));
            var new_item = pair(item, head(stack));
            set_head(stack, new_item);
        }

        function pop(stack) {
            if (is_empty_list(head(stack))) {
                return "Stack empty!";
            } else {
                var a = head(head(stack));
                display(a);
                set_head(stack, tail(head(stack)));
                return a;
            }
        }

        function delete_queue(q) {
            if (is_empty_queue(q)) {
                display("Error: Queue is empty.");
            } else {
                set_front_ptr(q, tail(front_ptr(q)));
                return q;
            }
        }

        function insert_queue(q, item) {
            var new_pair = pair(item, []);
            if (is_empty_queue(q)) {
                set_front_ptr(q, new_pair);
                set_rear_ptr(q, new_pair);
            } else {
                set_tail(rear_ptr(q), new_pair);
                set_rear_ptr(q, new_pair);
            }
            return q;
        }

        function dequeue(q) {
            var result = front_queue(q);
            delete_queue(q);
            return result;
        }
        
