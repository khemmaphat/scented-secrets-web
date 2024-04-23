import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PerfumeService, PerfumeServiceArray } from '../service/perfume_service'
import {
    AvgScoreCommment,
    PerfumeDataDetail,
    SearchRequest,
    SearchResponse,
} from '../interfaces/perfume_interface'
import { PerfumeCard } from '../components/PerfumeCard'
import { NoteDetailButton } from '../components/NoteDetailButton'
import { CommentBox } from '../components/CommentBox'
import { AvgCommentBox } from '../components/AvgCommentBox'
import { NoteDetailDescription } from '../components/NoteDetailDescription'
import { MySlider } from '../components/MySlider'

export const PerfumeDetail = () => {
    const location = useLocation()
    const perfumeId = location.state?.Id || 'No ID provided'

    const perfumeService = new PerfumeService()
    const perfumeServiceArray = new PerfumeServiceArray()

    const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDataDetail>()
    const [perfumeComment, setPerfumeComment] = useState<AvgScoreCommment>()
    const [perfumeSearch, setPerfumeSearch] = useState<SearchRequest>({
        Search: '',
        PageNum: 1,
        PageSize: 13,
        CosineValue: perfumeDetail?.cosineValue || 0,
    })
    const [perfumeSearchData, setPerfumeSearchData] =
        useState<SearchResponse[]>()

    const [selectedNote, setSelectedNote] = useState('')

    useEffect(() => {
        perfumeService
            .getPerfumeDetail(perfumeId)
            .then((response) => {
                setPerfumeDetail(response.data)
                setPerfumeSearch({
                    ...perfumeSearch,
                    CosineValue: response.data?.cosineValue || 0,
                })
            })
            .catch((error) => {
                console.error('Error fetching perfume detail data:', error)
            })

        perfumeService
            .getPerfumeComment(perfumeId)
            .then((response) => {
                setPerfumeComment(response.data)
            })
            .catch((error) => {
                console.error('Error fetching perfume detail data:', error)
            })
    }, [perfumeId])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional: Adds smooth scrolling effect
        })

        perfumeServiceArray
            .getSearchPerfumeData(perfumeSearch)
            .then((response) => {
                setPerfumeSearchData(response.data)
            })
            .catch((error) => {
                console.error('Error search fetching data:', error)
            })
    }, [perfumeSearch.CosineValue])
    return (
        <div className="text-lavidbrown bg-bonjour p-10">
            <div className="grid grid-cols-3">
                <div className="h-5/6 mx-auto border border-lavidbrown">
                    <img src={perfumeDetail?.imgUrl} className="h-full"></img>
                </div>
                <div className="col-start-2 col-span-2">
                    <span className="mr-2 text-3xl font-semibold">
                        {perfumeDetail?.brand}
                    </span>
                    <span className="text-3xl font-semibold">
                        {perfumeDetail?.name}
                    </span>
                    <div className="absolute max-60 mt-5">
                        <div className="text-xl">Top Notes</div>
                        {perfumeDetail?.notes.topNotes !== null ? (
                            <div>
                                <div className="flex space-x-2 items-center">
                                    {perfumeDetail?.notes.topNotes.map(
                                        (note, index) => (
                                            <NoteDetailButton
                                                key={index}
                                                imgUrl={note.imgUrl}
                                                showDetail={
                                                    note.name == selectedNote
                                                }
                                                onClick={() =>
                                                    setSelectedNote(note.name)
                                                }
                                            />
                                        )
                                    )}
                                </div>
                                <div>
                                    {perfumeDetail?.notes.topNotes.map(
                                        (note, index) => (
                                            <NoteDetailDescription
                                                key={index}
                                                name={note.name}
                                                description={note.description}
                                                imgUrl={note.imgUrl}
                                                showDetail={
                                                    note.name == selectedNote
                                                }
                                                onClose={() =>
                                                    setSelectedNote('')
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-16"></div>
                        )}

                        <div className="text-xl">Middle Notes</div>

                        {perfumeDetail?.notes.middleNotes !== null ? (
                            <div>
                                <div className="flex space-x-2 items-center">
                                    {perfumeDetail?.notes.middleNotes.map(
                                        (note, index) => (
                                            <NoteDetailButton
                                                key={index}
                                                imgUrl={note.imgUrl}
                                                showDetail={
                                                    note.name == selectedNote
                                                }
                                                onClick={() =>
                                                    setSelectedNote(note.name)
                                                }
                                            />
                                        )
                                    )}
                                </div>
                                <div>
                                    {perfumeDetail?.notes.middleNotes.map(
                                        (note, index) => (
                                            <NoteDetailDescription
                                                key={index}
                                                name={note.name}
                                                description={note.description}
                                                imgUrl={note.imgUrl}
                                                showDetail={
                                                    note.name == selectedNote
                                                }
                                                onClose={() =>
                                                    setSelectedNote('')
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-16"></div>
                        )}

                        <div className="text-xl">Base Notes</div>
                        {perfumeDetail?.notes.baseNotes !== null ? (
                            <div>
                                <div className="flex space-x-2 items-center">
                                    {perfumeDetail?.notes.baseNotes.map(
                                        (note, index) => (
                                            <NoteDetailButton
                                                key={index}
                                                imgUrl={note.imgUrl}
                                                showDetail={
                                                    note.name == selectedNote
                                                }
                                                onClick={() =>
                                                    setSelectedNote(note.name)
                                                }
                                            />
                                        )
                                    )}
                                </div>
                                <div>
                                    {perfumeDetail?.notes.baseNotes.map(
                                        (note, index) => (
                                            <NoteDetailDescription
                                                key={index}
                                                name={note.name}
                                                description={note.description}
                                                imgUrl={note.imgUrl}
                                                showDetail={
                                                    note.name == selectedNote
                                                }
                                                onClose={() =>
                                                    setSelectedNote('')
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-16"></div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="text-3xl  mb-5">PerfumeType</div>
                <div className="mb-5 flex space-x-3">
                    {perfumeDetail?.perfumeType.map((type, index) => (
                        <span
                            key={index}
                            className="text-xl border-2 border-lavidbrown rounded-full py-1 px-5"
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <div className="text-3xl mb-5">Details</div>
                <div className="mb-10"> {perfumeDetail?.description}</div>
            </div>
            <div>
                <div className="text-3xl mb-5">PerfumeType</div>
                <div className="mb-10"> {perfumeDetail?.howTo}</div>
            </div>
            <div>
                <div className="text-3xl mb-5">Reviews</div>
                <AvgCommentBox
                    AvgRating={perfumeComment?.averageRating || 0}
                    LikeRating={perfumeComment?.likeRating || 0}
                    OkRating={perfumeComment?.okRating || 0}
                    DislikeRating={perfumeComment?.dislikeRating || 0}
                />
            </div>
            {perfumeComment?.comments == null ? (
                <div className="font-roboto flex justify-center items-center py-10 mx-12 bg-bonjour border-2 border-venus mb-8">
                    <div>
                        <div className="flex justify-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/scented-secrets-1958e.appspot.com/o/comment.png?alt=media&token=820676fb-c142-430e-bc5c-44208e25f776"
                                className="size-32"
                            />
                        </div>
                        <div className="text-4xl">No Comment</div>
                    </div>
                </div>
            ) : (
                <div className="mx-10 mb-10">
                    <MySlider total={perfumeComment.comments.length}>
                        {perfumeComment?.comments.map((comment, index) => (
                            <CommentBox
                                key={index}
                                name={comment.name}
                                rating={comment.rating}
                                comment={comment.comment}
                            />
                        ))}
                    </MySlider>
                </div>
            )}

            <div>
                <div className="text-3xl mb-5">Other Perfumes</div>
                <div className="mx-10 mb-10">
                    <MySlider total={perfumeSearchData?.length || 0}>
                        {perfumeSearchData?.slice(1).map((perfume, index) => (
                            <div className="flex justify-center" key={index}>
                                <PerfumeCard
                                    PerfumeId={perfume.perfumeId}
                                    Name={perfume.name}
                                    Brand={perfume.brand}
                                    ImgUrl={perfume.imgUrl}
                                />
                            </div>
                        ))}
                    </MySlider>
                </div>
            </div>
        </div>
    )
}
