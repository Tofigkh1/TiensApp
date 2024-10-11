const UserForm: React.FC<Props> = (props: Props) => {
    const toast = useToast();
    let { img } = props;
    let [logoding, setlogoding] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    // localStorage'dan user verilerini çekiyoruz
    useEffect(() => {
        const storedUser = localStorage.getItem("user_info");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
                dispatch(setUser(parsedUser));
            }
        }
    }, [dispatch]);

    const onSubmit = async (values: FormValues) => {
        if (!img) {
            toast({
                title: `You have to add an image to the profile`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle',
            });
            return;
        }

        setlogoding(true);

        try {
            let imgres = await uploadFile({
                file: img,
                collectionId: "users-hash-password",
                documentId: "users-hash-password",
            }) as string | null;

            if (!imgres) {
                throw new Error('Image upload failed');
            }

            let userInfo = {
                ...values,
                img_url: imgres,
            };

            let res = await PutAuthUserr(userInfo);

            if (!res) {
                throw new Error('User update failed');
            }

            // localStorage'a kullanıcı bilgilerini kaydet
            localStorage.setItem("user_info", JSON.stringify(userInfo));
            dispatch(setUser(userInfo));

            toast({
                title: `User info is updated`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle',
            });

            setlogoding(false);
        } catch (err) {
            console.error(err);
            toast({
                title: `Error: ${err.message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle',
            });
            setlogoding(false);
        }
    };

    // initialValues kısmını user verileriyle güncelle
    const initialValues: FormValues = {
        phoneNumber: user.phoneNumber || '',
        username: user.username || '',
        email: user.email || '',
        fullname: user.fullname || '',
        address: user.address || '',
    };

    let { div, inpdiv, button } = style;
    return (
        <div>
            <Formik
                initialValues={initialValues} // Burada initialValues'ı localStorage verisiyle doldur
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, values }) => (
                    <Form>
                        <div className={div}>
                            <div className={inpdiv}>
                                <Input
                                    name='phoneNumber'
                                    type='text'
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    placeholder='+994 XX XXX XX XX'
                                    title="Contact Number"
                                />
                                <Input
                                    name='username'
                                    type='text'
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder='User Name'
                                    title="User Name"
                                />
                                <Input
                                    name='fullname'
                                    type='text'
                                    value={values.fullname}
                                    onChange={handleChange}
                                    placeholder='Full Name'
                                    title="Full Name"
                                />
                            </div>
                            <div className={inpdiv}>
                                <Input
                                    name='email'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    title='Email'
                                />
                                <Input
                                    name='address'
                                    type='text'
                                    value={values.address}
                                    onChange={handleChange}
                                    placeholder='Address'
                                    title="Address"
                                />
                                <button
                                    type="submit"
                                    className={button}
                                    style={logoding ? { cursor: "not-allowed" } : { cursor: 'pointer' }}
                                    disabled={logoding}
                                >
                                    {logoding ? <Spiner /> : "Save"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserForm;
